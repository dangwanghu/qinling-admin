const jingdian = {
    state: {
      device: 'desktop'
    },
    mutations: {
      CLOSE_SIDEBAR: (state, withoutAnimation) => {
        Cookies.set('sidebarStatus', 1)
        state.sidebar.opened = false
        state.sidebar.withoutAnimation = withoutAnimation
      }
    },
    actions: {
      toggleSideBar({ commit }) {
        commit('TOGGLE_SIDEBAR')
      }
    }
  }
  
  export default jingdian
  