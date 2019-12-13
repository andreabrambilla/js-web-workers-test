"use strict"

self.addEventListener("message", msg => {
  let view = new Float64Array(msg.data)
  for(let iter = 0; iter < 1000; ++iter) { // just to make things slower on purpose
    for(let i = 0; i < view.length; ++i)
      view[i] = (Math.random() * 100) | 0
  }
  postMessage(msg.data, [ msg.data ])
})
 
