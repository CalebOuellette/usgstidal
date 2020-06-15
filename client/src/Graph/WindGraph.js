import React, { Component } from 'react';
import Wind from './Wind';
import 'c3/c3.css';
import { requestPointLocationData } from '../Services/PointLocationData';

export class WindGraph extends Component {
    state = {
        loaded: false
    }
    graph;

    async componentWillMount() {
        const obs = await requestPointLocationData(this.props.site.id, "WindObs")
        const pred = await requestPointLocationData(this.props.site.id, "WindPred")
        this.graph = await Wind(obs, pred);
        this.setState({ loaded: true });
    }

    render() {
        return (
            <div>
                {this.state.loaded ? this.graph : <div>Loading </div>}
            </div>
        );
    }
}