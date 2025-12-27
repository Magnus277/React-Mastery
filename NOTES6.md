Reconciliation -> The algo react uses to dif one tree with another to determine which parts to be changed. The two trees are the browser's dom and virtual dom.

Update -> A change in the data used to render a react app. Usually the result of 'setState'. Eventually results in a re-render.

1.In a UI, its not necessary for every update to be applied immediately; in fact, doing so can be wasteful, causing frames to drop and degrading the user experience.
2.Different types of update have different priorities - an animation update needs to complete more quickly than, say, an update from a data store.

React Fiber main points -> 
    1.pause work and come back to it later.
    2.assign priority to different types of work
    3.reuse previously completed work
    4.abort work if its no longer needed.