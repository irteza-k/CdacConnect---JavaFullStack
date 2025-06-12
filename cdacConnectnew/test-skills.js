// Test script to add skills to the database
// Run this in the browser console or as a separate script

const skills = [
    "Java Programming",
    "Spring Boot",
    "React.js",
    "Node.js",
    "Python",
    "Machine Learning",
    "Data Science",
    "Web Development",
    "Mobile Development",
    "Database Design",
    "DevOps",
    "Cloud Computing",
    "UI/UX Design",
    "Agile Methodology",
    "Project Management"
];

// Function to add a skill
async function addSkill(skillName) {
    try {
        const response = await fetch('/api/skills', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ skillName: skillName })
        });
        
        if (response.ok) {
            console.log(`✅ Added skill: ${skillName}`);
        } else {
            console.log(`❌ Failed to add skill: ${skillName}`);
        }
    } catch (error) {
        console.error(`Error adding skill ${skillName}:`, error);
    }
}

// Add all skills
async function addAllSkills() {
    console.log('🚀 Adding skills to database...');
    for (const skill of skills) {
        await addSkill(skill);
        // Small delay to avoid overwhelming the server
        await new Promise(resolve => setTimeout(resolve, 100));
    }
    console.log('✅ Finished adding skills!');
}

// Run the script
addAllSkills(); 