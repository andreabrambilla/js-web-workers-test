"use strict"

function checkWorker() {
  if(typeof(Worker) === "undefined") {
    document.getElementById("result").innerHTML = "Sorry, your browser does not support Web Workers..."
    throw Error("Sorry, your browser does not support Web Workers...")
  }
}


var timer_w
var data_w


function startTimer() {
  checkWorker()
  if(typeof(timer_w) == "undefined") {
    console.log("Creating worker...")
    timer_w = new Worker("timer.js")
  }

  console.log(`Worker created: ${timer_w}`)
  timer_w.onmessage = function(event) {
    console.log(`Got event ${event} --> ${event.data}`)
    document.getElementById("timer").innerHTML = event.data
  }
}

function stopTimer() { 
  console.log("Stopping worker...")
  timer_w.terminate()
  timer_w = undefined
}


function generateData() {
  if(data_w !== undefined) {
    console.log("A worker is already running")
    return
  }

  document.getElementById("result").innerHTML = `Working!`

  console.log("Creating worker...")
  data_w = new Worker("data.js")

  data_w.onmessage = event => {
    const view = new Float64Array(event.data)
    //document.getElementById("result").innerHTML = `<br/>${view.join("<br/>")}` //displaying many elements (~1e6) can make the browser crash
    document.getElementById("result").innerHTML = `Done!`
    data_w.terminate()
    data_w = undefined
  }

  let data = new ArrayBuffer(8 * 10000000)
  data_w.postMessage(data, [ data ]) // Apparently this makes data detached (like a move in C++)
  data = undefined
}
