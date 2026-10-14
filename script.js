// This file contains the JavaScript code for the portfolio website. 
// It handles interactivity, such as animations or dynamic content loading.

document.addEventListener('DOMContentLoaded', () => {
    const projectList = document.getElementById('project-list');

    if (!projectList) return;

    fetch('./data/projects.js')
        .then(response => response.text())
        .then(scriptText => {
            const moduleMatch = scriptText.match(/const projects = (\[[\s\S]*?\]);\s*export default projects;/);

            if (!moduleMatch) {
                throw new Error('Project data not found');
            }

            const projects = eval('(' + moduleMatch[1] + ')');

            projects.forEach(project => {
                const projectElement = document.createElement('article');
                projectElement.classList.add('project');

                const titleElement = document.createElement('h3');
                titleElement.textContent = project.title;

                const descriptionElement = document.createElement('p');
                descriptionElement.textContent = project.description;

                const techList = document.createElement('div');
                techList.classList.add('tech-list');

                project.technologies.forEach(tech => {
                    const techItem = document.createElement('span');
                    techItem.classList.add('tech-item');
                    techItem.textContent = tech;
                    techList.appendChild(techItem);
                });

                const linkElement = document.createElement('a');
                linkElement.href = project.link;
                linkElement.textContent = project.link === '#' ? 'More Details' : 'View Project';
                linkElement.target = '_blank';

                projectElement.appendChild(titleElement);
                projectElement.appendChild(descriptionElement);
                projectElement.appendChild(techList);
                projectElement.appendChild(linkElement);
                projectList.appendChild(projectElement);
            });
        })
        .catch(error => {
            console.error('Error loading projects:', error);
            projectList.innerHTML = '<p>Projects are currently unavailable.</p>';
        });
});