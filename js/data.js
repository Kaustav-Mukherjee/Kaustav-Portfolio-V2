const projectData = {
    // Tech Categories (Populated by loader.js)
    categories: [],

    // Individual Projects (Populated by loader.js)
    projects: {},

    // Scroller Tech Stack
    techStack: [
        { id: 'excel', n: 'EXCEL' },
        { id: 'sql', n: 'SQL' },
        { id: 'python', n: 'PYTHON' },
        { id: 'pbi', n: 'POWER BI' },
        { id: 'tableau', n: 'TABLEAU' },
        { id: 'git', n: 'GIT' },
        { id: 'vscode', n: 'VS CODE' },
        { id: 'gsheets', n: 'GOOGLE SHEETS' },
        { id: 'googleantigravity', n: 'GOOGLE ANTIGRAVITY' }
    ],

    // Certifications Array (fallback when Supabase is unavailable)
    certifications: [
        {
            name: "Google Data Analytics",
            type: "Professional Certificate",
            date: "OCT 12, 2023",
            img: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=600&auto=format&fit=crop",
            certificate_image_url: "",
            verify_url: ""
        },
        {
            name: "Advanced SQL in PostgreSQL",
            type: "Coursera Program",
            date: "NOV 05, 2023",
            img: "https://images.unsplash.com/photo-1542626991-cbc4e32524cc?q=80&w=600&auto=format&fit=crop",
            certificate_image_url: "",
            verify_url: ""
        },
        {
            name: "Data Visualization with Tableau",
            type: "Specialization",
            date: "JAN 18, 2024",
            img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&auto=format&fit=crop",
            certificate_image_url: "",
            verify_url: ""
        }
    ]
};

// Export or global attachment
if (typeof module !== 'undefined') {
    module.exports = projectData;
} else {
    window.projectData = projectData;
}
