/**
 * Loader.js - Dynamic Discovery System
 * Automatically scans assets/categories/ and assets/projects/
 */

(function() {
    const CATS_DIR = 'assets/categories/';
    const PROJS_DIR = 'assets/projects/';

    async function discoverAll() {
        try {
            if (!window.projectData) window.projectData = { projects: {}, categories: [], techStack: [], certifications: [] };

            if (typeof USE_SUPABASE !== 'undefined' && USE_SUPABASE) {
                console.log('Fetching from Supabase...');
                await fetchFromSupabase();
            } else {
                console.log('Discovering from folders...');
                // 1. Discover Categories
                const catFolders = await getFolders(CATS_DIR);
                for (const folder of catFolders) {
                    await loadEntry(CATS_DIR, folder, 'category');
                }

                // 2. Discover Projects
                const projFolders = await getFolders(PROJS_DIR);
                for (const folder of projFolders) {
                    await loadEntry(PROJS_DIR, folder, 'project');
                }
            }

            // 3. Finalize
            updateCategoryCounts();
            window.projectsLoaded = true;
            document.dispatchEvent(new CustomEvent('projectsLoaded'));

        } catch (e) {
            console.warn('Discovery system encountered an issue:', e);
            document.dispatchEvent(new CustomEvent('projectsLoaded'));
        }
    }

    async function fetchFromSupabase() {
        try {
            const { createClient } = supabase;
            if (!window.supabaseClient) {
                window.supabaseClient = createClient(SUPABASE_CONFIG.URL, SUPABASE_CONFIG.ANON_KEY);
            }
            const sb = window.supabaseClient;

            // Fetch Categories
            const { data: cats, error: catError } = await sb.from('categories').select('*');
            if (catError) throw catError;
            window.projectData.categories = cats;

            // Fetch Projects
            const { data: projs, error: projError } = await sb.from('projects').select('*');
            if (projError) throw projError;
            
            projs.forEach(p => {
                window.projectData.projects[p.id] = p;
            });

            // Fetch Certifications (visible only, ordered)
            const { data: certs, error: certError } = await sb
                .from('certifications')
                .select('*')
                .eq('is_visible', true)
                .order('sort_order', { ascending: true });
            if (certError) throw certError;
            window.projectData.certifications = certs;

        } catch (e) {
            console.error('Supabase fetch failed:', e);
            throw e;
        }
    }

    async function getFolders(dir) {
        try {
            const response = await fetch(dir);
            const text = await response.text();
            const parser = new DOMParser();
            const doc = parser.parseFromString(text, 'text/html');
            const links = Array.from(doc.querySelectorAll('a'));
            
            return links
                .map(a => a.getAttribute('href'))
                .filter(href => href && href.endsWith('/') && !href.startsWith('..'))
                .map(href => href.replace(/\/$/, ''));
        } catch (e) {
            return [];
        }
    }

    async function loadEntry(baseDir, folderName, type) {
        try {
            const infoPath = `${baseDir}${folderName}/info.json`;
            const infoRes = await fetch(infoPath);
            if (!infoRes.ok) return;

            const info = await infoRes.json();
            
            if (type === 'category') {
                info.id = info.id || folderName;
                info.count = 0; // Initialize
                window.projectData.categories.push(info);
            } else {
                const id = info.id || folderName.toLowerCase().replace(/[^a-z0-9]/g, '_');
                info.img = info.img || `${baseDir}${folderName}/thumb.png`;
                info.id = id;
                window.projectData.projects[id] = info;
            }
        } catch (e) {
            console.error(`Failed to load ${type} in ${folderName}:`, e);
        }
    }

    function updateCategoryCounts() {
        const counts = {};
        Object.values(window.projectData.projects).forEach(p => {
            counts[p.cat] = (counts[p.cat] || 0) + 1;
        });

        window.projectData.categories.forEach(cat => {
            cat.count = counts[cat.id] || 0;
        });
    }

    window.addEventListener('DOMContentLoaded', discoverAll);
})();
