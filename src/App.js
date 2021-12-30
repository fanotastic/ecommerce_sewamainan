import React from 'react';
import { connect } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import NavbarComponent from './components/Navbar';
import { loginAction } from './redux/actions'
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import DetailProduct from './pages/DetailProduct';



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {
    this.keepLogin()
  }

  keepLogin = async () => {
    try {
      let local = localStorage.getItem("data")
      if (local) {
        local = JSON.parse(local)
        let res = await this.props.loginAction(local.username, local.password)
      }
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    return (
      <>
        <NavbarComponent />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product-page" element={<ProductsPage />} />
          <Route path="/product-detail" element={<DetailProduct />} />
        </Routes>
      </>
    );
  }
}

const mapToProps = (state) => {
  return {
    role: state.userReducer.role
  }
}

export default connect(mapToProps, { loginAction })(App);
