import React, {Component} from "react";
import JSONTree from "react-json-tree";
import PropTypes from "prop-types";

export default class RequestResultCard extends Component {
    render() {
        const theme = {
            scheme: 'bright',
            author: 'chris kempson (http://chriskempson.com)',
            base00: '#000000',
            base01: '#303030',
            base02: '#505050',
            base03: '#b0b0b0',
            base04: '#d0d0d0',
            base05: '#e0e0e0',
            base06: '#f5f5f5',
            base07: '#ffffff',
            base08: '#fb0120',
            base09: '#fc6d24',
            base0A: '#fda331',
            base0B: '#a1c659',
            base0C: '#76c7b7',
            base0D: '#6fb3d2',
            base0E: '#d381c3',
            base0F: '#be643c'
        };

        if (this.props.mode === 'json') {
            return (
                <div className={`card card-accent-${this.props.badge} card-result-wrapper`}>
                    <div className="card-header">
                        Request Result
                        <span className='badge badge-info float-right'>{this.props.request_time}ms</span>
                        <span className={`badge badge-${this.props.badge} float-right`} style={{marginRight: 5 + 'px'}}>{this.props.code}</span>
                    </div>
                    <div className="card-block card-result">
                        <JSONTree hideRoot={false} data={this.props.body} theme={theme}/>
                    </div>
                </div>
            )
        } else if (this.props.mode === 'raw') {
            return (
                <div className={`card card-accent-${this.props.badge} card-result-wrapper`}>
                    <div className="card-header">
                        Request Result
                        <span className='badge badge-info float-right'>{this.props.request_time}ms</span>
                        <span className={`badge badge-${this.props.badge} float-right`} style={{marginRight: 5 + 'px'}}>{this.props.code}</span>
                    </div>
                    <div className="card-block card-result" dangerouslySetInnerHTML={{ __html: this.props.body }}>
                    </div>
                </div>
            )
        } else {
            return (
                <div className={`card card-accent-${this.props.badge} card-result-wrapper`}>
                    <div className="card-header">
                        Request Result
                        <span className='badge badge-info float-right'>{this.props.request_time}ms</span>
                        <span className={`badge badge-${this.props.badge} float-right`} style={{marginRight: 5 + 'px'}}>{this.props.code}</span>
                    </div>
                    <div className="card-block card-result">
                        <JSONTree hideRoot={false} data={this.props.body} theme={theme}/>
                    </div>
                </div>
            )
        }
    }
}

RequestResultCard.propTypes = {
    badge: PropTypes.string.isRequired,
    request_time: PropTypes.number.isRequired,
    code: PropTypes.number.isRequired,
    body: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object,
    ]).isRequired,
    mode: PropTypes.string
};