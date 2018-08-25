import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import CONSTANTS from '../constants.js';
import misc from '../miscfuncs/misc.js';
import placeholder from '../images/placeholder.png';
import ApproxCostToolTip from './approxCostToolTip.js';
import TooltipMat from '@material-ui/core/Tooltip';

// This component constructs a single result that is displayed to the user from the api data
export class SingleResult extends Component {
    constructor(props) {
        super(props);
    }

    //
    handleAddEvent = (e) => {
        if (e.target.checked) {
            var tempObj = this.props.itinObj;
            tempObj["other"]=this.props.eventKey;
            this.props.AddEvent(tempObj);
        }
    }

    truncateText = (string) => {
        if (string.length > 50) {
            string = string.substring(0, string.length - (string.length - 60));
            string = string + ' ...';
            return string;
        } else {
            return string;
        }
    }

    render() {
        var titleStr = this.truncateText(this.props.itinObj.name);
        var urlStr = this.props.itinObj.url;
        var imgUrlStr = this.props.itinObj.thumbnail ? this.props.itinObj.thumbnail : placeholder;
        var timeStr = misc.convertMilTime(this.props.itinObj.time);
        var costStr = this.props.itinObj.cost;
        var approxCostFlag = this.props.itinObj.approximateFee;
        var origin = this.props.itinObj.origin;
        return (
            <div>
                <table className="singleApiResult">
                    <tbody>
                    <tr>
                        <td colSpan="3">
                            <a href={urlStr} target='_blank'><img className="singleResultImg" src={imgUrlStr} /></a>
                        </td>
                    </tr>
                    </tbody>

                    <tbody>
                    <tr>
                        <td colSpan="3">
                        <a href={urlStr} target='_blank'>{titleStr}</a></td>
                    </tr>
                    </tbody>
                    <tbody>
                    <tr>
                        <td>
                        <TooltipMat placement="top" title={CONSTANTS.ADDTOITIN_TOOLTIP_STR}>
                            <input key={titleStr} type="checkbox" onChange={this.handleAddEvent}/>
                            </TooltipMat>
                            </td>
                            <td>{timeStr}</td>
                            <td>
                                ${costStr}<ApproxCostToolTip approxCostFlag={approxCostFlag} origin={origin}/>                        
                            </td>

                    </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}

export default SingleResult;
