let cafe = document.querySelector('#cafe-list');
let foorm = document.querySelector('#add-cafe-form');



// data collection for database
function redercafe(doc){
    let li = document.createElement('li');
    let Nspan = document.createElement('span');
    let Cspan = document.createElement('span');
    let cross = document.createElement('div');

     Nspan.textContent = doc.data().name;
     Cspan.textContent = doc.data().city;
     cross.textContent = 'x';

    li.setAttribute('data-id',doc.id)
    li.appendChild(Nspan);
    li.appendChild(Cspan);
    li.appendChild(cross);

    cafe.appendChild(li);

    // delete

    cross.addEventListener('click', (e) => {
        let id = e.target.parentElement.getAttribute('data-id');
        db.collection('online cafes').doc(id).delete();
    })
}

// db.collection('online cafes').get().then((snapshot) => {
//    snapshot.docs.forEach((doc) =>{
//     redercafe(doc);
//    });
// })

// add data to database

foorm.addEventListener('submit',(e)=>{
    e.preventDefault();
    db.collection('online cafes').add({
        name:foorm.name.value,
        city:foorm.city.value
    });

    foorm.name.value = '',
    foorm.city.value = ''
    
    
})

// real time data

db.collection('online cafes').onSnapshot(snapshot => {
    let change = snapshot.docChanges();
    change.forEach(changes => {
        if(changes.type == 'added'){
            redercafe (changes.doc);
        }else if(changes.type == 'removed'){
        let li = cafe.querySelector(`[data-id=${changes.doc.id}]`);
            cafe.removeChild(li);
            console.log(li);
        }
    })
})