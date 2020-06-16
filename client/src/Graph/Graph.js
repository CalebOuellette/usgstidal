import "./Graph.css";
import Popup from "reactjs-popup";
import React from "react";

/*
import {WaterNTRGraph} from './WaterNTRGraph'
import {WindSpeedGraph} from './WindSpeedGraph'
import {WaterTWLGraph } from './WaterTWLGraph';
import {WindDirGraph} from './WindDirGraph';
*/

import { WaterGraph } from "./WaterGraph";
import { WindGraph } from "./WindGraph";

const offset = 30;

export const Graph = ({ x, y, action, site, display }) =>
{
    //determine the data types the site holds
    let waterData = false;
    let windData = false;
    if (site != null)
    {
        site.data.forEach(element =>
        {
            if (element.dataType == "TidePred" || element.dataType == "TideObs")
            {
                waterData = true;
            }
            if (element.dataType == "WindPred" || element.dataType == "WindObs")
            {
                windData = true;
            }
        });
    }

    //of both water and wind data is contained, render a modal menu.
    if (waterData && windData)
    {
        return (
            <div style={{ left: x - offset, top: y - offset }} className="popup_container">
                <div className="popup_inner">
                    <p>This location has both water and wind data available</p>
                    <Popup trigger={<button onClick={() => { }} className="graphbtn">Water Levels</button>} modal>
                        {close => (
                            <div className="modal">
                                <span className="close" onClick={close}>
                                    &times;
                                </span>
                                <div className="header">{site.siteDisplayName}: Total Water Level & Storm Surge</div>
                                <div className="content">
                                    <div className="graph_container">
                                        <WaterGraph site={site}></WaterGraph>
                                    </div>
                                </div>
                                <div className="actions">
                                    <button className="graphbtn" onClick={close}> {" "}
                                        close
                                    </button>
                                </div>
                            </div>
                        )}
                    </Popup>

                    <Popup trigger={<button onClick={() => { }} className="graphbtn">Winds</button>} modal>
                        {close => (
                            <div className="modal">
                                <span className="close" onClick={close}>
                                    &times;
                                </span>
                                <div className="header">{site.siteDisplayName}: Speed/Gusts & Direction </div>
                                <div className="content">
                                    <div className="graph_container">
                                        <WindGraph site={site}></WindGraph>
                                    </div>
                                </div>
                                <div className="actions">
                                    <button className="graphbtn" onClick={close}> {" "}
                                        close
                                    </button>
                                </div>
                            </div>
                        )}
                    </Popup>
                    <button className="graphbtn" onClick={action}> {" "}
                        close
                    </button>
                </div>
            </div>
        );
    } else if (waterData)
    {
        return (
            <Popup open={display} modal>
                {close => (
                    <div className="modal">
                        <span className="close" onClick={close, action}>
                            &times;
                        </span>
                        <div className="header">{site.siteDisplayName}: Total Water Level & Storm Surge</div>
                        <div className="content">
                            <div className="graph_container">
                                <WaterGraph site={site}></WaterGraph>
                            </div>
                        </div>
                        <div className="actions">
                            <button className="graphbtn" onClick={close}>{" "}
                                close
                            </button>
                        </div>
                    </div>
                )}
            </Popup>
        );
    } else if (windData)
    {
        return (
            <Popup open={display} modal>
                {close => (
                    <div className="modal">
                        <span className="close" onClick={close, action}>
                            &times;
                        </span>
                        <div className="header">{site.siteDisplayName}: Speed/Gusts & Direction </div>
                        <div className="content">
                            <div className="graph_container">
                                <WindGraph site={site}></WindGraph>
                            </div>
                        </div>
                        <div className="actions">
                            <button className="graphbtn" onClick={close}> {" "}
                                close
                            </button>
                        </div>
                    </div>
                )}
            </Popup>
        );
    } else
    {
        return null;
    }
    
};