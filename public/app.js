import { Data } from "./data.js"
import { Wraper, Card } from "./components.js"
import { Todo, Inprogress, Done } from "./lists.js"
import { Nav  } from "./nav.js"
import { Poruke } from "./msg.js"
import { Dialog } from "./dialog.js"




const Lista = ( status ) => {
    return Data.todos.list.filter( (el) => {
       return el.status === status
    })
}

const newTask = function( e ) {
    let el = e.target;
}

const EditTask = function( e ) {
    const id = Number( e.target.getAttribute('elid') );
    const index = Data.todos.list.findIndex( el => el.id === id ) 

    console.log( id, index)

    Data.todos.setEdit({ index: index, obj: Data.todos.list[index]})
    document.querySelector('dialog').showModal()
    //console.log( e.target.getAttribute('elid'))
}

const DelTask = function( e ) {

    let id = e.target.getAttribute("elid")

    Data.todos.fetchDelete(id)
    console.log( e.target.getAttribute('elid'))
    
}



function app() {

    return {
        oninit: Data.todos.fetchInit,
        onupdate: () => {
            //console.log(Data.todos.list)
        },
        view: ( vnode ) => {
            return m(Wraper, [
                m( Nav ,{ store: Data}),
             [
                    m(Todo,[
                        Lista('todo').map((el, index) => {
                            return m(Card
                                ,{key: index, elid: el.id, opis: el.desc, naslov: el.task, edit: EditTask, del:DelTask })
                        })
                    ]),
                    m(Inprogress,[
                        Lista('inprogress').map((el, index) => {
                             return m(Card
                                ,{key: index, elid: el.id, opis: el.desc, naslov: el.task, edit: EditTask, del:DelTask})
                        })
                    ]),
                    m(Done,[
                        Lista('done').map((el, index) => {
                             return m(Card
                                ,{key: index, elid: el.id, opis: el.desc, naslov: el.task, edit: EditTask, del:DelTask})
                        })
                    ])
                ],
                m(Poruke,{ data: Data.todos }) ,
                m(Dialog)
            ]);
        }
    };
}



m.mount( document.body, app)


