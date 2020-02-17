import React, { Component } from "react";
import { connect } from "react-redux";

import axios from "../../axios-backend";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actions from "../../store/actions/index";
import classes from "./Locus.module.css";

import classNames from "classnames";

// Material-UI components
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import GetAppSharpIcon from "@material-ui/icons/GetAppSharp";
import Box from "@material-ui/core/Box";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";

// Material-UI Datatables
import MUIDataTable from "mui-datatables";

// Plotly.js
import Plot from "react-plotly.js";

// Download function
import { saveAs } from "file-saver";

class Locus extends Component {
  state = {
    tabValue: 0
  };

  componentDidMount() {
    const locusId = this.props.location.pathname.substring(
      this.props.location.pathname.lastIndexOf("/") + 1
    );

    this.props.onFetchLocusFasta(locusId);
    this.props.onFetchLocusUniprot(locusId);
  }

  downloadFastaHandler = () => {
    const fastaJoin = this.props.fasta_data.join("\n");

    const blob = new Blob([fastaJoin], { type: "text/plain;charset=utf-8" });

    const locusIdDown = this.props.location.pathname.substring(
      this.props.location.pathname.lastIndexOf("/") + 1
    );

    console.log(locusIdDown);

    saveAs(blob, "locus_" + locusIdDown + ".fasta");
  };

  plotChangeHandler = value => {
    this.setState({ tabValue: value });
  };

  render() {
    const style = {
      buttonBar: {
        overflowX: "auto",
        display: "flex",
        justifyContent: "center",
        marginBottom: "20px"
      },
      button: {
        minWidth: "150px"
      }
    };

    let uniprot_data = <CircularProgress />;
    let fasta_data = <CircularProgress />;
    let scatter_data = <CircularProgress />;

    let downloadFasta = (
      <Button
        variant="contained"
        color="default"
        startIcon={<GetAppSharpIcon />}
        onClick={() => this.downloadFastaHandler()}
      >
        Download FASTA
      </Button>
    );

    // console.log(this.props.locus_fasta)
    if (!this.props.loading) {
      const columns = [
        {
          name: "locus_label",
          label: "Locus Label",
          options: {
            filter: true,
            sort: true,
            display: true,
            setCellHeaderProps: value => {
              return {
                style: {
                  fontWeight: "bold"
                }
              };
            }
          }
        },
        {
          name: "num_alleles",
          label: "Number of Alleles",
          options: {
            filter: true,
            sort: true,
            display: true,
            setCellHeaderProps: value => {
              return {
                style: {
                  fontWeight: "bold"
                }
              };
            }
          }
        },
        {
          name: "size_range",
          label: "Size Range (bp)",
          options: {
            filter: true,
            sort: true,
            display: true,
            setCellHeaderProps: value => {
              return {
                style: {
                  fontWeight: "bold"
                }
              };
            }
          }
        },
        {
          name: "median",
          label: "Median Size (bp)",
          options: {
            filter: true,
            sort: true,
            display: true,
            setCellHeaderProps: value => {
              return {
                style: {
                  fontWeight: "bold"
                }
              };
            }
          }
        },
        {
          name: "uniprot_label",
          label: "Uniprot Label",
          options: {
            filter: true,
            sort: true,
            display: true,
            setCellHeaderProps: value => {
              return {
                style: {
                  fontWeight: "bold"
                }
              };
            }
          }
        },
        {
          name: "uniprot_submitted_name",
          label: "Uniprot Submitted Name",
          options: {
            filter: true,
            sort: true,
            display: false,
            setCellHeaderProps: value => {
              return {
                style: {
                  fontWeight: "bold"
                }
              };
            }
          }
        },
        {
          name: "uniprot_uri",
          label: "Uniprot URI",
          options: {
            filter: true,
            sort: true,
            display: true,
            setCellHeaderProps: value => {
              return {
                style: {
                  fontWeight: "bold"
                }
              };
            },
            customBodyRender: (value, tableMeta, updateValue) => {
              return (
                <a href={value} target="_blank" rel="noopener noreferrer">
                  {value}
                </a>
              );
            }
          }
        }
      ];

      const options = {
        responsive: "scrollMaxHeight",
        selectableRowsHeader: false,
        selectableRows: "none",
        selectableRowsOnClick: false,
        print: false,
        download: false,
        filter: false,
        search: false,
        viewColumns: true,
        pagination: false
      };

      let table_data = [
        { ...this.props.locus_uniprot[0], ...this.props.basic_stats[0] }
      ];

      uniprot_data = (
        <MUIDataTable
          title={"Locus Details"}
          data={table_data}
          columns={columns}
          options={options}
        />
      );

      fasta_data = (
        <Plot
          data={this.props.locus_fasta}
          layout={{
            title: {
              text: table_data[0].locus_label
            },
            xaxis: {
              title: { text: "Sequence size in bp" }
            },
            yaxis: {
              title: { text: "Number of Alleles" }
            }
          }}
          useResizeHandler={true}
          style={{ width: "100%", height: "100%" }}
          line={{
            width: 1
          }}
        />
      );

      scatter_data = (
        <Plot
          data={this.props.scatter_data}
          layout={{
            title: {
              text: table_data[0].locus_label
            },
            xaxis: {
              title: { text: "Sequence size in bp" }
            },
            yaxis: {
              title: { text: "Allele ID" }
            },
            hovermode: "closest"
          }}
          useResizeHandler={true}
          style={{ width: "100%", height: "100%" }}
          line={{
            width: 1
          }}
        />
      );
    }
    return (
      <div>
        <div>
          <ExpansionPanel defaultExpanded>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h5" className={classes.title}>
                Locus Details
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <div
                className={classes.mainPaper}
                style={{ width: "100%", height: "100%" }}
              >
                <div style={style.buttonBar}>
                  <Button
                    style={style.button}
                    className={classNames(
                      this.state.tabValue === 0 && classes.tabButton
                    )}
                    onClick={() => {
                      this.plotChangeHandler(0);
                    }}
                  >
                    Histogram
                  </Button>
                  <Button
                    style={style.button}
                    className={classNames(
                      this.state.tabValue === 1 && classes.tabButton
                    )}
                    onClick={() => {
                      this.plotChangeHandler(1);
                    }}
                  >
                    Scatter
                  </Button>
                </div>
                {this.state.tabValue === 0 && fasta_data}
                {this.state.tabValue === 1 && scatter_data}
              </div>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </div>

        {uniprot_data}

        <Box
          style={{
            height: 80,
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          {downloadFasta}
        </Box>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    locus_fasta: state.locus.locus_fasta,
    locus_uniprot: state.locus.locus_uniprot,
    fasta_data: state.locus.fasta_data,
    scatter_data: state.locus.scatter_data,
    basic_stats: state.locus.basic_stats,
    loading: state.locus.loading,
    error: state.locus.error
    // token: state.auth.token
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchLocusFasta: locus_id => dispatch(actions.fetchLocusFasta(locus_id)),
    onFetchLocusUniprot: locus_id =>
      dispatch(actions.fetchLocusUniprot(locus_id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Locus, axios));
