import React from 'react';
import { Graph } from 'react-d3-graph';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import axios from 'axios';
import './App.css';
import bottle from './Components/assets/bottle.png'
import patient from './Components/assets/patient.png'

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {
        nodes: [{ id: `Patient`,
                  svg: patient,
                  size: 500,
                  fx: 400,
                  fy: 200
                }],
        links: []
      },
      description: new Map()
    }
  }

  componentDidMount() {
    axios.get("data/medications.json")
    .then(res => {
      const meds = res.data;

      this.state.description.set("Patient", "This is you!");

      meds.map((med) => {
        // console.log(med.medName);
        const newNode = `${med.medName}`;
        this.state.data.nodes.push({ id: newNode });
        this.state.description.set(med.medName, med.string);
        this.state.data.links.push({
          source: this.state.data.nodes[0].id,
          target: newNode,
        });
          // med.interactions.map((interaction) => {
          //   this.state.data.nodes.push({
          //     id: interaction.conflict
          //   })
          //   this.state.data.links.push({
          //     source: newNode,
          //     target: interaction.conflict,
          //     color: 'orange'
          //   });
          // })
      })

      this.setState({
        data: this.state.data,
        description: this.state.description,
      });
    })
  }

  onClickNode = function(nodeId) {
      // window.alert(`${description.get(nodeId)}`)
    Swal.fire({
      title: `${nodeId}`,
      text: `${description.get(nodeId)}`,
      // type: 'info',
      showCancelButton: true,
      confirmButtonText: 'Yep!',
      cancelButtonText: 'Naw.'
    });
  };

  onMouseOverNode = function(nodeId) {
      console.log(`Mouse over node ${nodeId}`);
  };

  onMouseOutNode = function(nodeId) {
      console.log(`Mouse out node ${nodeId}`);
  };

  onMouseOverLink = function(source, target) {
      console.log(`Mouse over in link between ${source} and ${target}`);
  };

  onMouseOutLink = function(source, target) {
      console.log(`Mouse out link between ${source} and ${target}`);
  };

  render() {
    const data = {
      nodes: this.state.data.nodes,
      links: this.state.data.links,
    };

    // console.log(this.state.data);

    // the graph configuration, you only need to pass down properties
    // that you want to override, otherwise default ones will be used
    const myConfig = {
      // directed: true,
      automaticRearrangeAfterDropNode: true,
      // collapsible: true,
      height: 400,
      highlightDegree: 2,
      highlightOpacity: 0.2,
      linkHighlightBehavior: true,
      maxZoom: 12,
      minZoom: 0.05,
      nodeHighlightBehavior: true,
      panAndZoom: false,
      staticGraph: false,
      width: 800,
      d3: {
          alphaTarget: 0.05,
          gravity: -250,
          linkLength: 120,
          linkStrength: 2,
      },
      node: {
          color: "#d3d3d3",
          fontColor: "black",
          fontSize: 10,
          fontWeight: "normal",
          highlightColor: "red",
          highlightFontSize: 14,
          highlightFontWeight: "bold",
          highlightStrokeColor: "red",
          highlightStrokeWidth: 1.5,
          labelProperty: n => (n.name ? `${n.id} - ${n.name}` : n.id),
          mouseCursor: "crosshair",
          opacity: 0.9,
          renderLabel: true,
          size: 300,
          strokeColor: "none",
          strokeWidth: 1.5,
          svg: bottle,
          symbolType: "circle",
          viewGenerator: null,
      },
      link: {
          color: "lightgray",
          highlightColor: "red",
          mouseCursor: "pointer",
          opacity: 1,
          semanticStrokeWidth: true,
          strokeWidth: 3,
          type: "STRAIGHT",
      },
    };

    // graph event callbacks
    const onClickGraph = function() {
        window.alert(`Clicked the graph background`);
    };

    const onDoubleClickNode = function(nodeId) {
        window.alert(`Double clicked node ${nodeId}`);
    };

    const onRightClickNode = function(event, nodeId) {
        window.alert(`Right clicked node ${nodeId}`);
    };

    const onClickLink = function(source, target) {
        window.alert(`Clicked link between ${source} and ${target}`);
    };

    const onRightClickLink = function(event, source, target) {
        window.alert(`Right clicked link between ${source} and ${target}`);
    };

    return (
      <div>
      <Graph
        id="graph-id"
        data={data}
        config={myConfig}
        onClickNode={this.onClickNode}
        onRightClickNode={onRightClickNode}
        // onClickGraph={onClickGraph}
        onClickLink={onClickLink}
        onRightClickLink={onRightClickLink}
        onMouseOverNode={this.onMouseOverNode}
        onMouseOutNode={this.onMouseOutNode}
        onMouseOverLink={this.onMouseOverLink}
        onMouseOutLink={this.onMouseOutLink}
      />
      </div>
    )
  }
}

export default App;
