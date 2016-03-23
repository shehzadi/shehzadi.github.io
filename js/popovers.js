var Popover = React.createClass({
	getInitialState: function(){
		return {
			popoverRectangle: false
		}
	},

	getDefaultProps: function(){
		return {
			noseWidth: 8
		}
	},

	handleActions: function(event) {
		this.props.handleActions(event)
	},

	closePopover: function() {
		this.props.closePopover()
	},

	componentDidMount: function() {
		var domNode = this.refs.container.getDOMNode().getBoundingClientRect();
		this.setState({
			popoverRectangle: domNode
		})
	},

	popoverClick: function(event) {
		event.stopPropagation();
	},

	onIfcMappingClick: function(hostIfcName, type) {
		this.props.onHostIfcClick(hostIfcName, type)
	},

	render: function() {
		var popover = false;

		var targetRect = this.props.popoverTarget.getBoundingClientRect();

		var popoverPosition = {
			left: 0,
			top: 0
		}

		var noseStyle = {
			borderWidth: this.props.noseWidth,
			left: 0,
			top: 0
		}

		//console.log(this.state.popoverRectangle);
		if (this.state.popoverRectangle){
			var leftPopoverPosition = (targetRect.left + (targetRect.width / 2)) - (this.state.popoverRectangle.width / 2);
			var topPopoverPosition = targetRect.top + targetRect.height + (this.props.noseWidth);
			popoverPosition = {
				left: leftPopoverPosition,
				top: topPopoverPosition
			}

			var leftNosePosition = (targetRect.left + (targetRect.width / 2)) - (this.props.noseWidth);
			var topNosePosition = targetRect.top + targetRect.height - this.props.noseWidth;
			noseStyle = {
				borderWidth: this.props.noseWidth,
				left: leftNosePosition,
				top: topNosePosition
			}
		}

		
		
		if (this.props.popoverTarget.name == "hostInterfaces"){
			popover = (
				<div id={this.props.popoverTarget.name} className="popoverContent" style={popoverPosition}>
					<span className="inlineInstruction">Click the Host Interfaces to show/hide for this project.</span>
					<HostIfcList
	                    selectedProjectIfcMapping = {this.props.selectedProjectIfcMapping}
	                    selectedProjectHostIfcs = {this.props.selectedProject.topology.host_interfaces || {}}
	                    onIfcMappingClick = {this.onIfcMappingClick}/>
				</div>
			)
		}

		return (
			<div id="popoverBackground" onClick={this.closePopover}>
  				<div style={popoverPosition} ref="container" onClick={this.popoverClick} className="popoverContainer">
  					<div className="popoverClose" onClick={this.closePopover}>&times;</div>
  					{popover}
  				</div>
  				<div className="nose" style={noseStyle}></div>
  			</div>	
		)
	},
});