import { Data } from "./data.js";

const Input = function ( ) {

    return {
        view:({attrs}) => {
            return m("input[type='text'][name='task'][id='task'][placeholder='task name']"
            ,{
                name: attrs.name,
                id: attrs.id,
                placeholder: attrs.placeholder,
                value: attrs.value,
                type: attrs.type,
                class: attrs.class,
            })
        }
    }
}

const Nav = function () {

  let tsk = {
    desc: "",
    task: "",
    status: "todo"
  }

  function Reset(){
      tsk = {desc: "",task: "",status: "todo"}
  }

    return {
      view: (vnode) => {
        return m("div.nav", [
          m("h2", { style: { display: "inline-block" } }, "todo app"),
          m(
            "div.f",
            { style: { display: "inline" } },
            m("fieldset", 
            [
              m("legend", "Dodaj nov zadatak - todo..."),

                m('input',{
                    type: "text",
                    id:"task",
                    placeholder:"task name",
                    value: tsk.task,
                    //name: "task",
                    oninput: (e) => {
                      tsk.task = e.target.value
                    }
                }),

                m('input',{
                    type: "text",
                    id:"desc",
                    placeholder:"opis",
                    value: tsk.desc,
                    //name: "desc",
                    oninput: (e) => {
                      tsk.desc= e.target.value
                    }
                }),

                m("button.btn.ripple",{
                  onclick: (e) => {
                    if( tsk.desc.length === 0 || tsk.task.length === 0 ){
                      console.log( tsk )
                      alert("unesite ime zadatka, i kratak opis")
                    } else {
                      console.log( tsk )
                      Data.todos.fetchNewTask({
                        'desc': tsk.desc,
                        'task':tsk.task,
                        'status':tsk.status
                      }, Reset )
                    }
                    
                  }
                },"Add Task"),
            ])
          ),
        ]);
      },
    };
  };


export { Nav }