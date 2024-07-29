import React from "react";
import styles from "../styles/TrackingStatus.module.css";

function TrackingStatus({ status, address, updateTime, name, content, trackingNumber, comment }) {
  const commonStyles = {
    container: {
      fontFamily: 'Helvetica, Arial, sans-serif',
      maxWidth: '600px',
      margin: '0 auto',
      padding: '20px',
      backgroundColor: '#f7f7f7',
      borderRadius: '8px',
    },
    trackingNumber: {
      fontSize: '1.2em',
      fontWeight: 'bold',
      color: '#333366',
      textAlign: 'center',
      marginBottom: '20px',
      padding: '10px',
      backgroundColor: 'white',
      borderRadius: '5px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    },
    statusBar: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '20px',
    },
    statusStep: {
      flex: 1,
      textAlign: 'center',
    },
    activeStep: {
      color: '#333366',
      fontWeight: 'bold',
    },
    inactiveStep: {
      color: '#999999',
    },
    details: {
      backgroundColor: 'white',
      padding: '15px',
      borderRadius: '5px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    },
    detailsTitle: {
      color: '#333366',
      fontWeight: 'bold',
      marginBottom: '10px',
    },
    detailsText: {
      color: '#333333',
      marginBottom: '5px',
    },
    updateTime: {
      color: '#666666',
      fontSize: '0.9em',
      marginTop: '10px',
    },
    onHoldContainer: {
      backgroundColor: '#FFF3CD',
      border: '1px solid #FFEEBA',
      borderRadius: '5px',
      padding: '15px',
      marginTop: '20px',
    },
    onHoldTitle: {
      color: '#856404',
      fontWeight: 'bold',
      marginBottom: '10px',
    },
    onHoldText: {
      color: '#856404',
    },
  };

  const CarIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="16px" height="16px" style={{shapeRendering: 'geometricPrecision', textRendering: 'geometricPrecision', imageRendering: 'optimizeQuality', fillRule: 'evenodd', clipRule: 'evenodd'}} xmlnsXlink="http://www.w3.org/1999/xlink">
      <g><path style={{opacity:0.814}} fill="#fac249" d="M 9.5,-0.5 C 11.1667,-0.5 12.8333,-0.5 14.5,-0.5C 14.5,0.166667 14.8333,0.5 15.5,0.5C 15.5,2.16667 15.5,3.83333 15.5,5.5C 11.7528,9.86282 9.41948,9.02948 8.5,3C 8.6483,1.74407 8.98163,0.577401 9.5,-0.5 Z"/></g>
      <g><path style={{opacity:1}} fill="#8f6a43" d="M 11.5,1.5 C 13.4646,1.94835 13.7979,2.94835 12.5,4.5C 10.4807,3.86709 10.1474,2.86709 11.5,1.5 Z"/></g>
      <g><path style={{opacity:0.675}} fill="#100537" d="M 15.5,11.5 C 15.5,12.8333 15.5,14.1667 15.5,15.5C 10.5,15.5 5.5,15.5 0.5,15.5C 0.5,14.8333 0.166667,14.5 -0.5,14.5C -0.5,13.1667 -0.5,11.8333 -0.5,10.5C 4.92897,9.13189 10.2623,9.46523 15.5,11.5 Z"/></g>
    </svg>
  );

  const ProgressBar = ({ status }) => {
    const getProgress = () => {
      switch (status) {
        case 'pending': return '0%';
        case 'intransit': return '50%';
        case 'delivered': return '100%';
        default: return '0%';
      }
    };

    return (
      <div style={{ position: 'relative', marginBottom: '40px' }}>
        <div style={{
          width: '100%',
          height: '6px',
          backgroundColor: '#e0e0e0',
          borderRadius: '3px',
          position: 'relative',
        }}>
          <div style={{
            width: getProgress(),
            height: '100%',
            backgroundColor: '#333366',
            borderRadius: '3px',
            transition: 'width 0.5s ease-in-out',
          }} />
          <div style={{
            position: 'absolute',
            top: '20px', // Adjust the distance to place the car icon below the progress bar
            left: getProgress(),
            transform: 'translateX(-50%)',
            transition: 'left 0.5s ease-in-out',
          }}>
            <CarIcon />
          </div>
        </div>
      </div>
    );
  };

  const renderStatusBar = (currentStatus) => (
    <div>
      <ProgressBar status={currentStatus} />
      <div style={commonStyles.statusBar}>
        <div style={{...commonStyles.statusStep, ...(currentStatus !== 'pending' ? commonStyles.activeStep : commonStyles.inactiveStep)}}>Label Created</div>
        <div style={{...commonStyles.statusStep, ...(currentStatus === 'intransit' || currentStatus === 'on hold' ? commonStyles.activeStep : commonStyles.inactiveStep)}}>In Transit</div>
        <div style={{...commonStyles.statusStep, ...(currentStatus === 'delivered' ? commonStyles.activeStep : commonStyles.inactiveStep)}}>Delivered</div>
      </div>
    </div>
  );

  const renderDetails = () => (
    <div style={commonStyles.details}>
      <p style={commonStyles.detailsText}>Address: {address}</p>
      <p style={commonStyles.detailsText}>Name: {name}</p>
      <p style={commonStyles.detailsText}>Content: {content}</p>
      <p style={commonStyles.updateTime}>Last Update: {updateTime}</p>
    </div>
  );

  let statusDisplay;
  if (status === "pending") {
    statusDisplay = (
      <div style={commonStyles.container}>
        <div style={commonStyles.trackingNumber}>
          Tracking Number: {trackingNumber}
        </div>
        {renderStatusBar(status)}
        <div style={commonStyles.details}>
          <p style={commonStyles.detailsTitle}>Label Created, Waiting for Pickup</p>
          {renderDetails()}
        </div>
      </div>
    );
  } else if (status === "intransit") {
    statusDisplay = (
      <div style={commonStyles.container}>
        <div style={commonStyles.trackingNumber}>
          Tracking Number: {trackingNumber}
        </div>
        {renderStatusBar(status)}
        <div style={commonStyles.details}>
          <p style={commonStyles.detailsTitle}>Package in Transit to Destination</p>
          {renderDetails()}
        </div>
      </div>
    );
  } else if (status === "on hold") {
    statusDisplay = (
      <div style={commonStyles.container}>
        <div style={commonStyles.trackingNumber}>
          Tracking Number: {trackingNumber}
        </div>
        {renderStatusBar(status)}
        <div style={commonStyles.details}>
          <p style={commonStyles.detailsTitle}>Package On Hold</p>
          {renderDetails()}
        </div>
        <div style={commonStyles.onHoldContainer}>
          <p style={commonStyles.onHoldTitle}>On Hold Notice</p>
          <p style={commonStyles.onHoldText}>{comment || "Package is currently on hold. We'll update you when it's back in transit."}</p>
        </div>
      </div>
    );
  } else if (status === "delivered") {
    statusDisplay = (
      <div style={commonStyles.container}>
        <div style={commonStyles.trackingNumber}>
          Tracking Number: {trackingNumber}
        </div>
        {renderStatusBar(status)}
        <div style={commonStyles.details}>
          <p style={commonStyles.detailsTitle}>Package Delivered</p>
          {renderDetails()}
        </div>
      </div>
    );
  } else {
    statusDisplay = (
      <div style={commonStyles.container}>
        <div style={commonStyles.trackingNumber}>
          Tracking Number: {trackingNumber}
        </div>
        <p style={{textAlign: 'center'}}>Status unknown</p>
      </div>
    );
  }

  return statusDisplay;
}

export default TrackingStatus;
