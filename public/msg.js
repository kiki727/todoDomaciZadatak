const Poruke = function () {

    let _h, data;

    return {
      onupdate: ( vnode ) =>{
        // data = vnode.attrs.data
        if( data.isMessage() ){
            _h = setTimeout(( )=>{
                data.removeMsg()
                 clearTimeout(_h)
                 m.redraw()
                }, 3750)
        }
      },
      view: ( vnode ) => {
        data = vnode.attrs.data
        return m(
          "div.snackbar",
          {
            class: data.isMessage( ) > 0 ? "" : "hide",
          },
          m("ul",
          data.isMessage() ? data.messages.map((el) => m('li', el)) : ""
          )
        );
      },
    };
  };


  export { Poruke }