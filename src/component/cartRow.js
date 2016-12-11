import React from 'react'
import style from './cartRow.css'
import {connect} from 'react-redux'
import {Move, MoveUp, MoveDown, UpdateKeyword, UpdateQuantity} from '../reducer/cart'

function doGetCaretPosition (oField) {

  // Initialize
  var iCaretPos = 0;

  // IE Support
  if (document.selection) {

    // Set focus on the element
    oField.focus();

    // To get cursor position, get empty selection range
    var oSel = document.selection.createRange();

    // Move selection start to 0 position
    oSel.moveStart('character', -oField.value.length);

    // The caret position is selection length
    iCaretPos = oSel.text.length;
  }

  // Firefox support
  else if (oField.selectionStart || oField.selectionStart === '0')
    iCaretPos = oField.selectionStart;

  // Return results
  return iCaretPos;
}

const CartRow = React.createClass({
    moveInQuantity(e) {
        const s = e.target.value;
        const pos = doGetCaretPosition(this.quantity);

        if (s.length === pos && e.keyCode === 39) {
            this.props.MoveRight();
        } else if (e.keyCode === 38) {
            this.props.MoveUp();
        } else if (e.keyCode === 40) {
            this.props.MoveDown();
        }
    },
    toQuantity() {
        const rowIdx = this.props.idx;
        this.props.MoveHere(rowIdx, 0);
    },
    toGeneral() {
        const rowIdx = this.props.idx;
        this.props.MoveHere(rowIdx, 1);
    },
    changeKeyword(e) {
        const s = e.target.value;
        const idx = this.props.idx;

        this.props.UpdateKeyword(idx, s);
    },
    changeQuantity(e) {
        const s = parseInt(e.target.value, 10) || 0;
        const idx = this.props.idx;

        this.props.UpdateQuantity(idx, s)
    },
    moveInGeneral(e) {
        const pos = doGetCaretPosition(this.general);

        if (0 === pos && e.keyCode === 37) {
            this.props.MoveLeft();
        } else if (e.keyCode === 38) {
            this.props.MoveUp();
        } else if (e.keyCode === 40) {
            this.props.MoveDown();
        }
    },
    componentDidUpdate(prevProps) {
        const rowIdx = this.props.idx;
        const prevIdx = prevProps.activeIdx;
        const newIdx = this.props.activeIdx;

        if (newIdx[0] === rowIdx && (prevIdx[0] !== newIdx[0] || prevIdx[1] !== newIdx[1])) {
            if (newIdx[1] === 0) {
                this.quantity.focus();
            }

            if (newIdx[1] === 1) {
                this.general.focus();
            }
        }
    },
    render() {
        const {nama, quantity, price, inDisplay} = this.props;

        return (
            <tr className={inDisplay ? style.green : ""}>
                <td>
                    <input className={style.quantity} 
                      type="text"
                      ref={(input) => { this.quantity = input; }} 
                      onKeyDown={this.moveInQuantity} 
                      onChange={this.changeQuantity}
                      onFocus={this.toQuantity} value={quantity || (quantity === 0 ? "0" : "")} />
                </td>
                <td>
                    <input className={style.general} 
                      type="text"
                      ref={(input) => { this.general = input; }} 
                      onKeyDown={this.moveInGeneral} 
                      onChange={this.changeKeyword}
                      onFocus={this.toGeneral} value={nama || ""} />
                </td>
                <td>
                    <input className={style.price + ' ' + style.right} 
                      type="text"
                      ref={(input) => { this.price = input; }} 
                      value={ nama ? ((quantity || 0) * price) : ""}
                      onChange={null}
                      disabled={true} />
                </td>
            </tr>
        );
    }
})

function DispatchToProps(dispatch, ownProps) {
    const rowIdx = ownProps.idx;

    return {
        UpdateKeyword: (idx, keyword) => {
            dispatch(UpdateKeyword(idx, keyword));
        },
        UpdateQuantity: (id, x) => {
            dispatch(UpdateQuantity(id, x))
        },
        MoveHere: (row, col) => {
            dispatch(Move(row, col))
        },
        MoveUp: () => {
            dispatch(MoveUp(rowIdx))
        },
        MoveDown: () => {
            dispatch(MoveDown(rowIdx))
        },
        MoveLeft: () => {
            dispatch(Move(rowIdx, 0))
        },
        MoveRight: () => {
            dispatch(Move(rowIdx, 1))
        }
    }
}

export default connect(undefined, DispatchToProps)(CartRow);
