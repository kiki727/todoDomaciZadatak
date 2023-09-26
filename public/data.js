const Data = {
    todos: {
        //todo lista
        list: [],
        // stack za poruke
        messages: [ ],
        // trenutni objekat za edit
        edit: {index: null, obj: {task: '', desc: ''} },
        //set edit 
        setEdit(data){
            this.edit = data
        },
        // init data on app start
        fetchInit() {
            m.request({
                method: "GET",
                url: "/todos",
               // extract: function(xhr) {return {status: xhr.status, body: xhr.responseText}},
            })
            .then(function(items) {
                //console.log(items.status, items.body)
                Data.todos.list = items
                console.log(items)
                
            })
        } ,
        // delete todo sa id
        fetchDelete(id){
            //let id = id
            m.request({
                method: "PUT",
                url: `/delete/${id}`,
            })
            .then( ( data ) => {
                if ( data.msg === 'OK'){
                        this.removeTask(data.id)
                        this.addMsg( `task ${data.id} deleted` )
                        //m.redraw()
                }
                console.log( data.id, data.msg)
                
            })

        },
        // fetch new task
        fetchNewTask( data, fnc ){
            //let id = id
            m.request({
                method: "PUT",
                url: `/todos`,
                body: data ,
            })
            .then( ( response ) => {
                console.log( response )
                this.list = response
                fnc()
            })

        },
        // updejtuj status
        fetchUpdateTask( id, data ){
            //let id = id
            m.request({
                method: "PATCH",
                url: `/todos/${id}`,
                body: data ,
            })
            .then( ( response ) => {
                console.log( response )
                this.list = response
                this.addMsg( `task ${data.id} status promenjen` )
            })

        },
        removeTask(id){
            this.list = this.list.filter(todo => todo.id !== id);
        },
        //dodaj poruku
        addMsg(msg){
            this.messages.push(msg)
        },
        // izbaci poruku
        removeMsg(){
            this.messages.shift()
        },
        // ima li poruka
        isMessage(){
            return this.messages.length > 0;
        }
    }
}


export { Data }