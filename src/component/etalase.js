import lodash from 'lodash'
import React from 'react'
import {connect} from 'react-redux'
import CategoryLabel from './categoryLabel'
import EtalaseItem from './etalaseItem'
import {Sub as EtalaseSub} from '../reducer/etalase'
import {Sub as CartSub} from '../reducer/cart'

import EtalaseStyle from './etalase.css'

const Etalase = React.createClass({
    getInitialState() {
        return {
            shown: {},
            perRow: 5
        }
    },
    componentDidMount() {
        const width = document.getElementById('etalase') && document.getElementById('etalase').clientWidth;
        this.setState({
            perRow: parseInt(Math.floor(width / 182), 10)
        })
    },
    toggleShown(categoryName, nrow) {
        this.setState({
            shown: lodash.assign({}, this.state.shown, {
                [categoryName]: nrow
            })
        })
    },
    render() {
        const {etalase, cartCount} = this.props;

        if (etalase.isLoading) {
            return (
                <div className={EtalaseStyle.etalase}>
                    <div className={EtalaseStyle.loadingWrapper}>
                        <img src="loading.gif" className={EtalaseStyle.loading} alt="loading" />
                    </div>
                </div>
            );
        }

        if (etalase.isDisplay) {
            const itemColls = lodash.map(etalase.items, (categoryItems) => {
                const categoryName = categoryItems.category;
                const {shown} = this.state;

                let shownItems = [];
                if (!(categoryName in shown) || shown[categoryName] === 1) {
                    shownItems = categoryItems.items.slice(0, this.state.perRow);
                } else {
                    shownItems = categoryItems.items;
                }

                const items = lodash.map(shownItems, (item) => {
                    return <EtalaseItem key={item.id} {...item} count={cartCount[item.id] || 0} keyword={etalase.keyword} category={categoryName} />
                })

                return (
                    <div key={categoryName} className={EtalaseStyle.etaWrapper}>
                        <span className={EtalaseStyle.pagingWrapper}>
                            <span className={EtalaseStyle.categoryToggle} onClick={this.toggleShown.bind(null, categoryName)}>Toggle</span>
                            <span className={EtalaseStyle.categoryToggle} onClick={this.toggleShown.bind(null, categoryName)}>None</span>
                            <span className={EtalaseStyle.categoryToggle} onClick={this.toggleShown.bind(null, categoryName)}>1 Row</span>
                            <span className={EtalaseStyle.categoryToggle} onClick={this.toggleShown.bind(null, categoryName)}>2 Rows</span>
                            <span className={EtalaseStyle.categoryToggle} onClick={this.toggleShown.bind(null, categoryName)}>All</span>
                        </span>
                        <CategoryLabel name={categoryName} />
                        {items}
                        <div style={{clear:'both'}} />
                    </div>
                );
            })

            return (
                <div className={EtalaseStyle.etalase} id="etalase">
                    {
                        itemColls
                    }
                </div>
            );
        }

        // const categoryItems = lodash.map(etalase, (categoryItems) => {
        //     const categoryName = categoryItems.category.name;
        //     const items = lodash.map(categoryItems.items, (item) => {
        //         return <EtalaseItem key={item.id} {...item} />
        //     })

        //     return (
        //         <div key={categoryName}>
        //             <CategoryLabel name={categoryName} />
        //             {items}
        //             <div style={{clear:'both'}} />
        //         </div>
        //     );
        // })

        return (
            <div className={EtalaseStyle.etalase}>
                <h3>TODO: First time etalase</h3>
            </div>
        );
    }
})

function StateToProps(state) {
    const countState = CartSub('cart/count', state)
    return {
        etalase: EtalaseSub('etalase/etalase', state, countState),
        cartCount: countState
    }
}

export default connect(StateToProps)(Etalase);
