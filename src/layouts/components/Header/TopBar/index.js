import React from "react";
import PropTypes from "prop-types";
import {withStyles, Link, Badge, Hidden} from '@material-ui/core';
import AppBar from "@material-ui/core/AppBar/index";
import Toolbar from "@material-ui/core/Toolbar/index";
import {bindActionCreators} from 'redux';
import {connect} from "react-redux";
import styles from './styles';
import Button from "@material-ui/core/Button";
import * as alertActions from "../../../../store/actions/alerts";
import * as customerActions from "../../../../store/actions/customers";


const links = [{
    title: 'Daily Deals',
    link: '/'
}, {
    title: 'Sell',
    link: '/'
}, {
    title: 'Help & Contact',
    link: '/'
}];

class TopBar extends React.Component {

    render() {

        const {
            classes,
            total,
        } = this.props;

        let {customer} = this.props

        return (
            <AppBar className={classes.topBar}>
                <Toolbar className={classes.toolbar}>
                    {
                        customer ?
                        <div className={classes.authText + ' ' + classes.divTopBar}>
                            <span>Hi {customer.name}</span>
                            <Link className={classes.authLink} style={{color: 'red'}}>
                            My Profile
                            </Link>
                            <span>|</span>
                            <Link onClick={() => {
                                this.props.logout()
                            }} className={classes.authLink} id="btnLogout" style={{color: 'red'}}>
                             Logout
                            </Link>
                        </div>
                        :
                        <div className={classes.authText + ' ' + classes.divTopBar}>
                            <span>Hi!</span>
                            <Link onClick={() => {
                              this.props.showAuth(false)
                              }} className={classes.authLink} id="btnSignIn" style={{color: 'red'}}>
                              Sign in
                            </Link>
                            <span>or</span>
                            <Link onClick={() => {
                              this.props.showAuth(true)
                              }} className={classes.authLink} id="btnRegister" style={{color: 'red'}}>
                              Register
                          </Link>
                        </div>
                    }

                    <Hidden mdDown className={classes.divTopBar}>
                        <div className={classes.linksContainer}>
                            {
                                links.map((item, index) => (
                                    <Button key={index} classes={{root: classes.button}}>
                                        <Link to={item.link} className={classes.navLink}>
                                            {item.title}
                                        </Link>
                                    </Button>
                                ))
                            }
                        </div>
                    </Hidden>
                    <Hidden mdDown className={classes.divTopBar}>
                      <div className={classes.currencyIconContainer}>
                          <span className="flag-icon flag-icon-gb"/>
                      </div>
                      <div className={classes.currencyContainer}>
                          <div className={classes.currencyText}>GBR</div>
                      </div>
                    </Hidden>
                    <div className={classes.divTopBar}>
                        <div className={classes.iconContainer} id="menuCartLink" onClick={() => {
                            this.props.showCart()
                        }}>
                            <Badge
                                classes={{badge: classes.badge}}
                                badgeContent={total.Quantity}
                                color="primary"
                            >
                                <img alt="Shopping Cart Icon" src="/assets/icons/shopping-cart-black.svg"/>
                            </Badge>
                        </div>
                        <div className={classes.yourBag} style={{color: 'black'}}>Your Bag: {total.currencyFormat}<span id="menuCartTotalPrice">{total.Price}</span></div>
                    </div>
                </Toolbar>
            </AppBar>
        );
    }
}

TopBar.propTypes = {
    classes: PropTypes.object.isRequired
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        showCart: alertActions.showCart,
        showAuth: alertActions.showAuth,
        logout: customerActions.logoutCustomerAction,
    }, dispatch);
}

function mapStateToProps(state) {
    return {
        customer: state.customers.auth.customer,
        products: state.cart.products,
        total: state.cart.total,
    }
}

export default withStyles(styles, {withTheme: true})(connect(mapStateToProps, mapDispatchToProps)(TopBar));
