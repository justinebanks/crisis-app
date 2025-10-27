
async function getHOTProjects(page) {
    const params = new URLSearchParams({
        page: page || 1,
    });

    try {
        const response = await fetch("https://tasking-manager-production-api.hotosm.org/api/v2/projects/?" + params.toString(), { method: "GET" });
        const data = await response.json();
        return data;
    }
    catch (error) {
        console.error(error);
    }
}

async function getHOTProjectByID(projectID) {
    try {
        const response = await fetch(`https://tasking-manager-production-api.hotosm.org/api/v2/projects/${projectID}/`, { method: "GET" });
        const data = await response.json();
        return data;
    }
    catch (error) {
        console.error(error);
    }
}


async function getAllHOTProjects() {
    const data = await getHOTProjects(1);
    let numPages = data.pagination.pages;
    let allPromises = [];

    for (let page = 1; page <= numPages; page++) {
        const pagePromise = getHOTProjects(page);
        allPromises.push(pagePromise);
    }

    const allData = await Promise.all(allPromises);
    let allProjects = [];
    
    for (let data of allData) {
        allProjects.push(...data["results"]);
    }

    return allProjects;
}

const projects = await getAllHOTProjects();
console.log(projects[400]);