import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';

import 'rc-slider/assets/index.css';
import CONSTANTS from '../constants';

import Slider from 'rc-slider';
const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);

const styles = theme => ({
    root: {
        position: 'relative',
    },
    paper: {
        position: 'absolute',
        top: 175,
        width: '25%',
        maxWidth: '320px',
        padding: '1em 2em',
        textAlign: 'left',
        color: CONSTANTS.PRIMARY_COLOR,
    },
    slider: {
        zIndex: '9999',
    },
    header: {
        marginBottom: '10px',
        fontSize: '1em',
    },
    span: {
        color: CONSTANTS.PRIMARY_COLOR,
    },
    actions: {
        marginTop: '2em',
        fontSize: '0.9em',
    },
    apply: {
        float: 'right',
    }
});

class PriceSlider extends React.Component {

    constructor(props) {
        super(props);

        this.setWrapperRef = this.setWrapperRef.bind(this);
        //this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    state = {
        open: false,
        min: CONSTANTS.DEFAULT_PRICEFILTER_MIN,
        max: CONSTANTS.DEFAULT_PRICEFILTER_MAX,
        prevMin: CONSTANTS.DEFAULT_PRICEFILTER_MIN,
        prevMax: CONSTANTS.DEFAULT_PRICEFILTER_MAX,
        value: [CONSTANTS.DEFAULT_PRICEFILTER_MIN, CONSTANTS.DEFAULT_PRICEFILTER_MAX,],
    };

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    setWrapperRef(node) {
        this.wrapperRef = node;
    }

    // /**
    //  * Alert if clicked on outside of element
    //  */
    // handleClickOutside(event) {
    //     if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
    //         this.setState({
    //             open: false,
    //             value: [this.state.prevMin, this.state.prevMax],
    //         });
    //     }
    // }

    onSliderChange = (value) => {
        this.setState({
            value: value,
        })
    }

    handleApply = (props) => {
        this.props.setPriceRange(this.state.value)
        this.setState({
            open: false,
            value: [this.state.value[0], this.state.value[1]],
            prevMin: this.state.value[0],
            prevMax: this.state.value[1],
        })
    };

    handleClear = (props) => {
        this.props.setPriceRange([CONSTANTS.DEFAULT_PRICEFILTER_MIN, CONSTANTS.DEFAULT_PRICEFILTER_MAX,])
        this.setState({
            open: false,
            min: CONSTANTS.DEFAULT_PRICEFILTER_MIN,
            max: CONSTANTS.DEFAULT_PRICEFILTER_MAX,
            value: [CONSTANTS.DEFAULT_PRICEFILTER_MIN, CONSTANTS.DEFAULT_PRICEFILTER_MAX,],
        })
    };

    render() {
        const { classes } = this.props;

        if (this.props.apiCalls) {
            this.props.handleResetFilter();
        }
    
        // reset filter when the api calls happen
        if (this.props.apiCalls) {
            this.props.setPriceRange([CONSTANTS.DEFAULT_PRICEFILTER_MIN, CONSTANTS.DEFAULT_PRICEFILTER_MAX,])
            this.setState({
                open: false,
                min: CONSTANTS.DEFAULT_PRICEFILTER_MIN,
                max: CONSTANTS.DEFAULT_PRICEFILTER_MAX,
                value: [CONSTANTS.DEFAULT_PRICEFILTER_MIN, CONSTANTS.DEFAULT_PRICEFILTER_MAX,],
            })
        }


        return (
            <div className="filter" ref={this.setWrapperRef}>
                <div className="filter-header">
                    <p>Event Price?</p>
                </div>
                <div className="price-slider">
                    <span>${this.state.value[0]}</span>
                    <Range allowCross={false} value={this.state.value} defaultValue={[CONSTANTS.DEFAULT_PRICEFILTER_MIN, CONSTANTS.DEFAULT_PRICEFILTER_MAX]}
                        min={CONSTANTS.DEFAULT_PRICEFILTER_MIN} max={CONSTANTS.DEFAULT_PRICEFILTER_MAX}
                        step={CONSTANTS.PRICE_FILTER_STEP}
                        onChange={this.onSliderChange} tipFormatter={value => `$${value}.00`}
                    />
                    <span className={classes.span}>${this.state.value[1]}</span>
                </div>
                {/*<div className={classes.actions}>*/}
                    {/*<Button href="#text-buttons" className={classes.button} onClick={this.handleClear}>*/}
                        {/*Clear*/}
                    {/*</Button>*/}
                    {/*<Button href="#text-buttons" className={classes.button} onClick={this.handleApply}>*/}
                        {/*Apply*/}
                    {/*</Button>*/}
                {/*</div>*/}
            </div>
        );
    }
}

PriceSlider.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PriceSlider);
