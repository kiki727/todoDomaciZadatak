const Todo = function () {
    return {
      view: (vnode) => {
        return m("div.todo", [m("p", "todo . . ."), m("ul", [vnode.children])]);
      },
    };
  };
  
  const Inprogress = function () {
    return {
      view: (vnode) => {
        return m("div.inprogress", [
          m("p", "in progress . . ."),
          m("ul", [vnode.children]),
        ]);
      },
    };
  };
  
  const Done = function () {
    return {
      view: (vnode) => {
        return m("div.done", [m("p", "done . . ."), m("ul", [vnode.children])]);
      },
    };
  };

  export { Todo, Inprogress, Done }