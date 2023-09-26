const Wraper = {
  view(vnode) {
    return m("div.parent", [vnode.children]);
  },
};

const Card = {

  view(vnode){
    return m('li', { key: vnode.attrs.key },
    m('div', {'class':'card'},
      [
        m('span', {'class':'komande'},
          [
            m('div', {'class':'edit','elid': vnode.attrs.elid,'title':'promeni status','onclick': vnode.attrs.edit}, 
              m.trust('&#9998;')
            ),
            m('div', {'class':'close','elid':vnode.attrs.elid,'title':'delete','onclick': vnode.attrs.del}, 
              m.trust('&times;')
            )
          ]
        ),
        m('div', {'class':'task'},
          [
            m('div', {'class':'naslov'}, 
            vnode.attrs.naslov
            ),
            m('div', {'class':'opis'}, 
            vnode.attrs.opis
            )
          ]
        )
      ]
    )
  )
  }
 
}



export { Wraper, Card };
