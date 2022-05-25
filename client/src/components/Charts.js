import React from 'react'
import { Line } from "react-chartjs-2";

export const Charts = (props) => {
  return (
    <div>
        CP3<Line data={{labels: [...props.graphXAxis], datasets: [{label: 'CP3',data: props.CP3,fill: false,lineTension: 0}]}} height={10} width={200} options={{ scales: {yAxes: [{display: false}]}}}/>
        C3<Line data={{labels: [...props.graphXAxis], datasets: [{label: 'C3',data: props.C3,fill: false,lineTension: 0}]}} height={10} width={200} options={{ scales: {yAxes: [{display: false}]}}}/>
        F5<Line data={{labels: [...props.graphXAxis], datasets: [{label: 'F5',data: props.F5,fill: false,lineTension: 0}]}} height={10} width={200} options={{ scales: {yAxes: [{display: false}]}}}/>
        PO3<Line data={{labels: [...props.graphXAxis], datasets: [{label: 'PO3',data: props.PO3,fill: false,lineTension: 0}]}} height={10} width={200} options={{ scales: {yAxes: [{display: false}]}}}/>
        PO4<Line data={{labels: [...props.graphXAxis], datasets: [{label: 'PO4',data: props.PO4,fill: false,lineTension: 0}]}} height={10} width={200} options={{ scales: {yAxes: [{display: false}]}}}/>
        F6<Line data={{labels: [...props.graphXAxis], datasets: [{label: 'F6',data: props.F6,fill: false,lineTension: 0}]}} height={10} width={200} options={{ scales: {yAxes: [{display: false}]}}}/>
        C4<Line data={{labels: [...props.graphXAxis], datasets: [{label: 'C4',data: props.C4,fill: false, lineTension: 0}]}} height={10} width={200} options={{ scales: {yAxes: [{display: false}]}}}/>
        CP4<Line data={{labels: [...props.graphXAxis], datasets: [{label: 'CP4',data: props.CP4,fill: false,lineTension: 0}]}} height={10} width={200} options={{ scales: {yAxes: [{display: false}]}}}/>
    </div>
  )
}
