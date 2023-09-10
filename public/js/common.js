function adoptAnimal(id, UserId){
    const url = '/animals/adoptions';
    
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            AnimalId: id,
            UserId: UserId
        })
    }).then((response) => {
        if (response.ok) {
            const resData = 'Made an Adoption';
            alert(resData);
            location.reload()
            return Promise.resolve(resData);
        }
        return Promise.reject(response);
      })
      .catch((response) => {
        alert(response.statusText);
      });
}

function deleteAnimal(id){
    const url = '/animals/adoptions';
    fetch(url, {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            AnimalId: id,
        })
    }).then((response) => {
        if (response.ok) {
            const resData = 'Adoption Cancelled';
            alert(resData);
            location.reload()
            return Promise.resolve(resData);
        }
        return Promise.reject(response);
      })
      .catch((response) => {
        alert(response.statusText);
      });
}

function updateSpecies(id){
    newName = prompt("Update species");
    const url = '/species/update';
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            SpeciesId: id,
            Name: newName
        })
    }).then((response) => {
        if (response.ok) {
            const resData = 'Species Updated';
            alert(resData);
            location.reload()
            return Promise.resolve(resData);
        }
        return Promise.reject(response);
      })
      .catch((response) => {
        alert(response.statusText);
      });
}

function deleteSpecies(id){
    const url = '/species/delete';
    fetch(url, {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            SpeciesId: id,
        })
    }).then((response) => {
        if (response.ok) {
            const resData = 'Species Deleted';
            alert(resData);
            location.reload()
            return Promise.resolve(resData);
        }
        return Promise.reject(response);
      })
      .catch((response) => {
        alert(response.statusText);
      });
}

function updateTemperament(id){
    newName = prompt("Update temperament");
    const url = '/temperament/update';
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            TemperamentId: id,
            Name: newName
        })
    }).then((response) => {
        if (response.ok) {
            const resData = 'Temperament Updated';
            alert(resData);
            location.reload()
            return Promise.resolve(resData);
        }
        return Promise.reject(response);
      })
      .catch((response) => {
        alert(response.statusText);
      });
}

function deleteTemperament(id){
    const url = '/temperament/delete';
    fetch(url, {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            TemperamentId: id,
        })
    }).then((response) => {
        if (response.ok) {
            const resData = 'Temperament Deleted';
            alert(resData);
            location.reload()
            return Promise.resolve(resData);
        }
        return Promise.reject(response);
      })
      .catch((response) => {
        alert(response.statusText);
      });
}

function sqlQuery1() {
    const url = '/animals/popular';
    console.log("hello");
    fetch(url, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json'
        }
    }).then((response) => {
        if (response.ok) {
            const resData = 'Sorted name by most popular';
            alert(resData);
            window.location.href = url;
            return Promise.resolve(resData);
        }
        return Promise.reject(response);
      })
      .catch((response) => {
        alert(response.statusText);
      });
}

function sqlQuery2(){
    const url = '/animals/adopted';
    console.log("hello");
    fetch(url, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json'
        }
    }).then((response) => {
        if (response.ok) {
            const resData = 'All the adopted animals';
            alert(resData);
            window.location.href = url;
            return Promise.resolve(resData);
        }
        return Promise.reject(response);
      })
      .catch((response) => {
        alert(response.statusText);
      });

}

function sqlQuery3() {
    const url = '/animals/age';
    console.log("hello");
    fetch(url, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json'
        }
    }).then((response) => {
        if (response.ok) {
            const resData = 'All animals sorted by age';
            alert(resData);
            window.location.href = url;
            return Promise.resolve(resData);
        }
        return Promise.reject(response);
      })
      .catch((response) => {
        alert(response.statusText);
      });
}

function sqlQuery4() {
    startDate = prompt("From date (YYYY-MM-DD): ");
    endDate = prompt("To date (YYYY-MM-DD): ");
    console.log(startDate + endDate);
    const url = '/animals';
fetch(url, {
    method: 'POST',
    headers: {
        'Content-type': 'application/json'
    },
    body: JSON.stringify({
        StartDate: startDate,
        EndDate: endDate
    })
}).then((response) => {
        if (response.ok) {
            const resData = 'Animals in date range';
            alert(resData);
            console.log("Redirecting to:", url);
            window.location.href = url;
            return Promise.resolve(resData);
        }
        return Promise.reject(response);
      })
      .catch((response) => {
        alert(response.statusText);
      });
}

function sqlQuery5() {
    const url = '/animals/countBySize';
    fetch(url, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json'
        }
    }).then((response) => {
        if (response.ok) {
            return response.json();
        }
        return Promise.reject(response);
    }).then((data) => {
        const message = `Number of animals in sizes:\n\nSmall: ${data.small}\nMedium: ${data.medium}\nLarge: ${data.large}`;
        alert(message);
        return Promise.resolve(data);
    }).catch((response) => {
        alert(response.statusText);
    });
}

function allAnimals(){
    const url = '/animals';
    console.log("hello");
    fetch(url, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json'
        }
    }).then((response) => {
        if (response.ok) {
            const resData = 'Animals page :)';
            alert(resData);
            window.location.href = url;
            return Promise.resolve(resData);
        }
        return Promise.reject(response);
      })
      .catch((response) => {
        alert(response.statusText);
      });
}