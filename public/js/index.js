const formDOM = document.form
const taskInputDOM = document.form.description
const listOfTasks = document.getElementById('list')
const loadingDOM = document.querySelector('.loading-tasks')
const formAlertDOM = document.querySelector('.form-alert')
const deleteDOM = document.querySelector('.delete')

//list tasks
const loadTasks = async () => {
    loadingDOM.style.visibility = 'visible'
    try {
        const { data: { allTasks } } = await axios.get('/api/v1/tasks')
        if(allTasks.length < 1) {
            loadingDOM.style.visibility = 'hidden'
            listOfTasks.innerHTML = '<div class="nothing"><p>Nothing to show</p></div>' 
        } else {
            const taskslist = allTasks.map((task) => {
                const { _id: taskID, name, completed } = task
    
                if(completed) {
                    return `
                    <div class="single-task completed-task">
                        <div><p>${name} </p><span class="completed-flag">completed</span></div>
                        <div><a id="edit" href='../task.html?id=${taskID}'>edit</a></div>
                    </div>
                    `
                } else {
                    return `
                    <div class="single-task">
                        <p>${name}</p>
                        <div><a id="edit" href='../task.html?id=${taskID}'>edit</a></div>
                        
                    </div>
                `
                }
                
            }).join('')
            loadingDOM.style.visibility = 'hidden'
            listOfTasks.innerHTML = taskslist
        }
        
    } catch(error) {
        console.log({ msg: error })
        listOfTasks.innerHTML = `<h5>There was an error, please try later...</h5>`
    }
}

loadTasks()

// input a new task
formDOM.addEventListener('submit', async(e) => {
    e.preventDefault()
    const name = taskInputDOM.value
    try {
        await axios.post('/api/v1/tasks', { name: name, completed: false })
        taskInputDOM.value = ''
        formAlertDOM.classList.add('success-alert')
        formAlertDOM.style.display = 'block'
        formAlertDOM.innerHTML = '<p>Success!</p>'
        loadTasks()
    } catch(error) {
        console.log({msg: error})
    }
    setTimeout(() => {
      formAlertDOM.style.display = 'none'
    }, 3000)
})

// delete task

listOfTasks.addEventListener('click', async (e) => {
    const el = e.target
    console.log('clicado')
    if (el.parentElement.classList.contains('delete-btn')) {
      const id = el.parentElement.dataset.id
      try {
        await axios.delete(`/api/v1/tasks/${id}`)
        loadTasks()
      } catch (error) {
        console.log(error)
      }
    }
  })
