import { Data } from "./data.js"

let choice = Data.todos.edit.obj['status'] || 'todo'

const select = ( ) => {
    

    return {
    oncreate:()=>{
        console.log('oncreate: ', choice)
        },
      view: () => [
        m('h6', 'promeni status zadatka'),
        m('br'),
        m('select', {
            onchange: e => {
                choice = e.target.value
                console.log(choice)
            },
            value: choice
          },
          ['todo', 'inprogress', 'done'].map(x =>
            m('option', x)
          )
        )
      ]
    }
}

const Dialog = ( )=>{

    let dialog;

    return{
        oncreate:(vnode)=>{
            dialog = vnode.dom;
        },
        view:( vnode )=>{
            return m('dialog',
            [
                m('span', {'class':'komande'},
                [
                    m('div', {
                        'class':'close',
                        'title':'close',
                        'onclick': () => {
                            dialog.close()
                        }
                    }, 
                    m.trust('&times;')
                  )
                ]),
                m('span.naslov', Data.todos.edit.obj.task
                ),
                m('span.opis', Data.todos.edit.obj.desc
                ),

                m('br'),m('hr'),
                m(select),
                m('br'),m('hr'),m('br'),

                m('h4', {'style':{'color':'coral'}}, 
                    `status:  ${Data.todos.edit.obj.status} `
                ),
                m('button.btn.ripple',{
                    onclick: (e) => {
                        Data.todos.edit.obj['status'] = choice
                        let id = Data.todos.edit.obj['id']
                        Data.todos.fetchUpdateTask( id, Data.todos.edit.obj )
                        document.querySelector('dialog').close()
                    }
                },'promeni status'
                )
            ]
        )
        }
    }
}


export { Dialog }