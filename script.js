// Global variables to track current state
let currentView = 'options'; // options, manual, ai, preview
let resumeData = {};

// Show/hide sections
function showSection(sectionId) {
    document.querySelectorAll('.form-container, #resume-preview, .options-container').forEach(section => {
        section.classList.add('hidden');
    });
    
    if (sectionId === 'options') {
        document.querySelector('.options-container').classList.remove('hidden');
    } else if (sectionId === 'manual') {
        document.getElementById('manual-form').classList.remove('hidden');
    } else if (sectionId === 'ai') {
        document.getElementById('ai-form').classList.remove('hidden');
    } else if (sectionId === 'preview') {
        document.getElementById('resume-preview').classList.remove('hidden');
    }
    
    currentView = sectionId;
}

// Show manual form
function showManualForm() {
    showSection('manual');
}

// Show AI generator form
function showAIGenerator() {
    showSection('ai');
}

// Go back to options
function goBackToOptions() {
    showSection('options');
}

// Go back to form from preview
function goBackToForm() {
    if (resumeData.source === 'manual') {
        showSection('manual');
    } else {
        showSection('ai');
    }
}

// Add experience field
function addExperience() {
    const container = document.getElementById('experience-container');
    const newEntry = document.createElement('div');
    newEntry.className = 'experience-entry';
    newEntry.innerHTML = `
        <input type="text" placeholder="Job Title" class="exp-title">
        <input type="text" placeholder="Company" class="exp-company">
        <input type="text" placeholder="Duration (e.g., 2020-2022)" class="exp-duration">
        <textarea placeholder="Description of responsibilities and achievements" class="exp-description"></textarea>
    `;
    container.appendChild(newEntry);
}

// Add education field
function addEducation() {
    const container = document.getElementById('education-container');
    const newEntry = document.createElement('div');
    newEntry.className = 'education-entry';
    newEntry.innerHTML = `
        <input type="text" placeholder="Degree/Certificate" class="edu-degree">
        <input type="text" placeholder="Institution" class="edu-institution">
        <input type="text" placeholder="Duration (e.g., 2016-2020)" class="edu-duration">
    `;
    container.appendChild(newEntry);
}

// Handle manual form submission
document.getElementById('resume-form').addEventListener('submit', function(e) {
    e.preventDefault();
    generateResumeFromManualForm();
});

// Generate resume from manual form data
function generateResumeFromManualForm() {
    // Get personal info
    const personalInfo = {
        name: document.getElementById('full-name').value,
        title: document.getElementById('job-title').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        location: document.getElementById('location').value,
        linkedin: document.getElementById('linkedin').value,
        summary: document.getElementById('summary').value
    };
    
    // Get experience
    const experiences = [];
    const experienceEntries = document.querySelectorAll('.experience-entry');
    experienceEntries.forEach(entry => {
        experiences.push({
            title: entry.querySelector('.exp-title').value,
            company: entry.querySelector('.exp-company').value,
            duration: entry.querySelector('.exp-duration').value,
            description: entry.querySelector('.exp-description').value
        });
    });
    
    // Get education
    const education = [];
    const educationEntries = document.querySelectorAll('.education-entry');
    educationEntries.forEach(entry => {
        education.push({
            degree: entry.querySelector('.edu-degree').value,
            institution: entry.querySelector('.edu-institution').value,
            duration: entry.querySelector('.edu-duration').value
        });
    });
    
    // Get skills
    const skills = document.getElementById('skills').value.split(',').map(skill => skill.trim());
    
    // Compile resume data
    resumeData = {
        personalInfo,
        experiences,
        education,
        skills,
        source: 'manual'
    };
    
    // Generate and show preview
    generateResumePreview();
    showSection('preview');
}

// Generate resume with AI
function generateResumeWithAI() {
    const jobTitle = document.getElementById('ai-job-title').value;
    const course = document.getElementById('ai-course').value;
    const experienceLevel = document.getElementById('ai-experience').value;
    
    if (!jobTitle || !course) {
        alert('Please enter both job title and course studied');
        return;
    }
    
    // Simulate AI generation with predefined templates
    // In a real application, this would call an AI API
    const generatedData = generateAIContent(jobTitle, course, experienceLevel);
    
    resumeData = {
        personalInfo: generatedData.personalInfo,
        experiences: generatedData.experiences,
        education: generatedData.education,
        skills: generatedData.skills,
        source: 'ai'
    };
    
    // Generate and show preview
    generateResumePreview();
    showSection('preview');
}

// Simulate AI content generation
function generateAIContent(jobTitle, course, experienceLevel) {
    // This is a simplified simulation of AI content generation
    // In a real application, this would call an AI API like OpenAI
    
    const names = ['Alex Johnson', 'Sarah Williams', 'Michael Chen', 'Jessica Martinez'];
    const companies = ['TechInnovate', 'DataSolutions Inc', 'CloudServices Corp', 'DigitalCreations LLC'];
    const universities = ['Stanford University', 'MIT', 'Harvard University', 'California Institute of Technology'];
    
    const randomName = names[Math.floor(Math.random() * names.length)];
    const randomCompany = companies[Math.floor(Math.random() * companies.length)];
    const randomUniversity = universities[Math.floor(Math.random() * universities.length)];
    
    // Base data structure
    const data = {
        personalInfo: {
            name: randomName,
            title: jobTitle,
            email: `${randomName.toLowerCase().replace(' ', '.')}@example.com`,
            phone: `+1 (555) ${100 + Math.floor(Math.random() * 900)}-${1000 + Math.floor(Math.random() * 9000)}`,
            location: 'San Francisco, CA',
            linkedin: `linkedin.com/in/${randomName.toLowerCase().replace(' ', '')}`,
            summary: `Experienced ${jobTitle} with ${experienceLevel} of experience in the field. Strong background in ${course}. Proven track record of delivering high-quality results in fast-paced environments.`
        },
        experiences: [],
        education: [],
        skills: []
    };
    
    // Generate experiences based on experience level
    let expCount = experienceLevel === '0-1' ? 1 : 
                  experienceLevel === '2-5' ? 2 : 3;
    
    for (let i = 0; i < expCount; i++) {
        data.experiences.push({
            title: i === 0 ? jobTitle : `Junior ${jobTitle}`,
            company: `${randomCompany}${i > 0 ? i : ''}`,
            duration: i === 0 ? '2020 - Present' : `${2018 - i} - ${2020 - i}`,
            description: `- Developed and maintained ${['web applications', 'data pipelines', 'cloud infrastructure', 'mobile apps'][i % 4]}
- Collaborated with cross-functional teams to deliver projects on time
- Implemented ${['responsive designs', 'efficient algorithms', 'scalable architecture', 'user-friendly interfaces'][i % 4]}
- Optimized performance resulting in ${25 + i * 5}% improvement`
        });
    }
    
    // Generate education
    data.education.push({
        degree: `Bachelor of Science in ${course}`,
        institution: randomUniversity,
        duration: '2014 - 2018'
    });
    
    // Generate skills based on job title
    const skillSets = {
        'Frontend Developer': ['JavaScript', 'React', 'HTML5', 'CSS3', 'TypeScript', 'Redux', 'Webpack', 'Responsive Design'],
        'Data Analyst': ['SQL', 'Python', 'R', 'Tableau', 'Data Visualization', 'Statistical Analysis', 'Excel', 'Machine Learning'],
        'Software Engineer': ['Java', 'Python', 'C++', 'Algorithms', 'Data Structures', 'Git', 'Agile Methodology', 'Debugging'],
        'UX Designer': ['Figma', 'User Research', 'Wireframing', 'Prototyping', 'UI Design', 'Usability Testing', 'Adobe Creative Suite']
    };
    
    // Default skills if job title doesn't match
    data.skills = skillSets[jobTitle] || [
        'Project Management', 'Team Leadership', 'Problem Solving', 
        'Communication', 'Critical Thinking', 'Adaptability'
    ];
    
    return data;
}

// Generate resume preview
function generateResumePreview() {
    const resumeElement = document.getElementById('resume');
    
    // Create HTML for the resume
    resumeElement.innerHTML = `
        <div class="resume-header">
            <h1>${resumeData.personalInfo.name}</h1>
            <div class="title">${resumeData.personalInfo.title}</div>
            <div class="contact-info">
                <div><i class="fas fa-envelope"></i> ${resumeData.personalInfo.email}</div>
                <div><i class="fas fa-phone"></i> ${resumeData.personalInfo.phone}</div>
                <div><i class="fas fa-map-marker-alt"></i> ${resumeData.personalInfo.location}</div>
                ${resumeData.personalInfo.linkedin ? `<div><i class="fab fa-linkedin"></i> ${resumeData.personalInfo.linkedin}</div>` : ''}
            </div>
        </div>
        
        <div class="resume-section">
            <h2>Professional Summary</h2>
            <p>${resumeData.personalInfo.summary}</p>
        </div>
        
        <div class="resume-section">
            <h2>Work Experience</h2>
            ${resumeData.experiences.map(exp => `
                <div class="experience-item">
                    <h3>${exp.title}</h3>
                    <div class="company">${exp.company} | <span class="duration">${exp.duration}</span></div>
                    <p>${exp.description.replace(/\n/g, '<br>')}</p>
                </div>
            `).join('')}
        </div>
        
        <div class="resume-section">
            <h2>Education</h2>
            ${resumeData.education.map(edu => `
                <div class="education-item">
                    <h3>${edu.degree}</h3>
                    <div class="institution">${edu.institution} | <span class="duration">${edu.duration}</span></div>
                </div>
            `).join('')}
        </div>
        
        <div class="resume-section">
            <h2>Skills</h2>
            <div class="skills-list">
                ${resumeData.skills.map(skill => `
                    <div class="skill-tag">${skill}</div>
                `).join('')}
            </div>
        </div>
    `;
}

// Print/Export resume
function printResume() {
    const resumeElement = document.getElementById('resume');
    const originalContents = document.body.innerHTML;
    
    document.body.innerHTML = resumeElement.innerHTML;
    window.print();
    document.body.innerHTML = originalContents;
    
    // Re-initialize the page
    showSection('preview');
}

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    showSection('options');
});