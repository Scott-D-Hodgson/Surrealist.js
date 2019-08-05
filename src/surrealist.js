
//     Surrealist.js 1.0.0
//     https://github.com/Scott-D-Hodgson/Surrealist.js
//     (c) 2019 Scott D. Hodgson
//     Surrealist may be freely distributed under the MIT license.
(function() {
    // Setup
    // --

    var self = window.document;

    // Save the previous value of the 'Surrealist' variable.
    var previousSurrealist = document.Surrealist;

    var Surrealist = function(id, config) {
        var item = self.getElementById(id);
        var type = typeof item;
        if (type !== 'function' && type === 'object' && item.tagName === 'UL') {
            item.style.position = 'relative';
            if (!Surrealist._preTransitions.hasOwnProperty(id)) {
                Surrealist._preTransitions[id] = {};
            };
            for (var i = 0; i < item.children.length; i++) {
                var li = item.children[i];
                var li_id = li.getAttribute('id');
                if (li_id) {
                    if (!Surrealist._preTransitions[id].hasOwnProperty(li_id)) {
                        Surrealist._preTransitions[id][li_id] = li.getBoundingClientRect();
                        Surrealist._preTransitions[id][li_id]['sequence'] = i;
                    };
                }
            }
        };
    };

    Surrealist._GetPreListKeys = function() {
        return Surrealist._GetListKeys(Surrealist._preTransitions)
    };

    Surrealist._GetPreItemKeys = function(list) {
        return Surrealist._GetItemKeys(list, Surrealist._preTransitions);
    };

    Surrealist._GetPostListKeys = function() {
        return Surrealist._GetListKeys(Surrealist._postTransitions)
    };

    Surrealist._GetListKeys = function(transitions) {
        return Object.keys(transitions);
    };

    Surrealist._GetPostItemKeys = function(list) {
        return Surrealist._GetItemKeys(list, Surrealist._postTransitions);
    };

    Surrealist._GetItemKeys = function(list, transitions) {
        var itemKeys = [];
        var listKeys = Surrealist._GetListKeys(transitions);
        if (!Surrealist._ListExists(list, transitions)) {
            for (var i = 0, ilen = listKeys.length; i < ilen; i++) {
                itemKeys = itemKeys.concat(Object.keys(transitions[listkeys[i]]));
            }
        } else {
            if (listKeys.includes(list)) {
                itemKeys = Object.keys(transitions[list]);
            }
        }
        return itemKeys;
    }

    Surrealist._SortPreItemKeys = function(list, attribute) {
        return Surrealist._SortItemKeys(list, attribute, Surrealist._preTransitions);
    }

    Surrealist._SortPostItemKeys = function(list, attribute) {
        return Surrealist._SortItemKeys(list, attribute, Surrealist._postTransitions);
    }

    Surrealist._SortItemKeys = function(list, attribute, transitions) {
        var itemKeys = [];
        var itemDetails = [];
        if (Surrealist._ListExists(list, transitions)) {
            itemKeys = Surrealist._GetItemKeys(list, transitions);
            for (var i = 0, ilen = itemKeys.length; i < ilen; i++) {
                var itemDetail = {};
                itemDetail['id'] = itemKeys[i];
                itemDetail['sort'] = transitions[list][itemKeys[i]][attribute];
                itemDetails.push(itemDetail);
            };
            var sorted = itemDetails.sort(function(a, b) { return a['sort'] - b['sort'] });
            itemKeys = sorted.map(function(a) { return a['id'] });
        }
        return itemKeys;
    }

    Surrealist._GetListElement = function(id) {
        return Surrealist._GetElement(id, 'UL');
    };

    Surrealist._GetItemElement = function(id) {
        return Surrealist._GetElement(id, 'LI');
    };

    Surrealist._GetElement = function(id, tag) {
        var item = self.getElementById(id);
        var type = typeof item;
        if (type !== 'function' && type === 'object' && item && item.tagName === tag.toUpperCase()) 
        {
            return item;
        };
        return null;
    };

    Surrealist._GetListItemElements = function(id) {
        var list = Surrealist._GetListElement(id);
        if (!list) {
            return [];
        };
        return list.children;
    };

    Surrealist._InitializePreTransitionItems = function(id) {
        Surrealist._InitializeTransitionItems(id, Surrealist._preTransitions);
    };

    Surrealist._InitializePostTransitionItems = function(id) {
        Surrealist._InitializeTransitionItems(id, Surrealist._postTransitions);
    }; 

    Surrealist._InitializeTransitionItems = function(id, transitions) {
        if (!transitions.hasOwnProperty(id)) {
            transitions[id] = {}; 
        };
    };

    Surrealist._InitializePreTransitionItem = function(listid, itemid, value) {
        Surrealist._InitializeTransitionItem(listid, itemid, value, Surrealist._preTransitions);
    };

    Surrealist._InitializePostTransitionItem = function(listid, itemid, value) {
        Surrealist._InitializeTransitionItem(listid, itemid, value, Surrealist._postTransitions);
    }; 

    Surrealist._InitializeTransitionItem = function(listid, itemid, value, transitions) {
        if (!transitions.hasOwnProperty(listid)) {
            transitions[listid] = {}; 
        };
        if (!transitions[listid].hasOwnProperty(itemid)) {
            transitions[listid][itemid] = value;
        };
    };

    Surrealist._ListExistsInPreTransition = function(listid) {
        return Surrealist._ListExists(listid, Surrealist._preTransitions);
    };

    Surrealist._ListExistsInPostTransition = function(listid) {
        return Surrealist._ListExists(listid, Surrealist._postTransitions);
    };

    Surrealist._ListExists = function(listid, transitions) {
        return transitions.hasOwnProperty(listid);
    };

    Surrealist._ItemExistsInPreTransition = function(listid, itemid) {
        return Surrealist._ItemExists(listid, itemid, Surrealist._preTransitions);
    };

    Surrealist._ItemExistsInPostTransition = function(listid, itemid) {
        return Surrealist._ItemExists(listid, itemid, Surrealist._postTransitions);
    };

    Surrealist._ItemExists = function(listid, itemid, transitions) {
        return (transitions.hasOwnProperty(listid) && transitions[listid].hasOwnProperty(itemid));
    };

    Surrealist._InitializeElementId = function(element) {
        if (!element.id) {
            element.id = Surrealist._GetNextSurrealistId; 
        };
        return element.id;
    };

    Surrealist._ShuffleArray = function(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
        }
        return array;
    }

    Surrealist._GetNextSurrealistId = function() {
        return (Surrealist._idOffset++);
    };

    Surrealist._AnalyzeOldPositions = function() {
        // update old positions
        var preListKeys = Surrealist._GetPreListKeys();        
        for (var i = 0, ilen = preListKeys.length; i < ilen; i++) {
            var iitem = Surrealist._GetListElement(preListKeys[i]);
            if (iitem) {
                Surrealist._InitializePreTransitionItems(preListKeys[i]);
                var preListElements = Surrealist._GetListItemElements(preListKeys[i]);
                for (var j = 0, jlen = preListElements.length; j < jlen; j++) {
                    var preItemId = Surrealist._InitializeElementId(preListElements[j]);
                    if (!Surrealist._ItemExistsInPostTransition(preListKeys[i], preItemId)) {
                        // Is a transition to remove, special CSS needed
                        Surrealist._removalTransitions.push(preItemId);
                    };
                    var itemDetails = preListElements[j].getBoundingClientRect();
                    itemDetails['sequence'] = j;
                    Surrealist._InitializePreTransitionItem(preListKeys[i], preItemId, itemDetails);
                };
            };    
        };
    }

    Surrealist._AnalyzeNewPositions = function() {
        // find the new positions of all the known list items
        Surrealist._postTransitions = {};
        var preListKeys = Surrealist._GetPreListKeys();        
        for (var i = 0, ilen = preListKeys.length; i < ilen; i++) {
            var iitem = Surrealist._GetListElement(preListKeys[i]);
            if (iitem) {
                Surrealist._InitializePostTransitionItems(preListKeys[i]);
                var postListElements = Surrealist._GetListItemElements(preListKeys[i]);
                for (var j = 0, jlen = postListElements.length; j < jlen; j++) {
                    var postItemId = Surrealist._InitializeElementId(postListElements[j]);
                    if (!Surrealist._ItemExistsInPreTransition(preListKeys[i], postItemId)) {
                        // Is a transition from new, special CSS needed
                        Surrealist._additionTransitions.push(postItemId);
                    };
                    var itemDetails = postListElements[j].getBoundingClientRect();
                    itemDetails['sequence'] = j;
                    Surrealist._InitializePostTransitionItem(preListKeys[i], postItemId, itemDetails);
                };
            };    
        };
    }

    Surrealist._BuildCssTransitions = function() {
        // Build the CSS transitions
        var oldPositionStyles = '';
        var newPositionStyles = '';
        var removalPositionStyles = '';
        var uls = Object.keys(Surrealist._postTransitions);        
        for (var i = 0, ilen = uls.length; i < ilen; i++) {
            var lis = Object.keys(Surrealist._postTransitions[uls[i]]);
            for (var j = 0, jlen = lis.length; j < jlen; j++) {
                // Build old style
                var oldPositionStyle = '.SurrealPre' + lis[j].toString() + ' {';
                oldPositionStyle += 'position: relative; ';
                oldPositionStyle += 'top: ' + ((Surrealist._postTransitions[uls[i]][lis[j]].top - Surrealist._preTransitions[uls[i]][lis[j]].top) * -1) + 'px; ';
                oldPositionStyle += 'left: ' + ((Surrealist._postTransitions[uls[i]][lis[j]].left - Surrealist._preTransitions[uls[i]][lis[j]].left) * -1) + 'px; ';
                // oldPositionStyle += 'z-index: ' + (99 - Surrealist._preTransitions[uls[i]][lis[j]].sequence) + '; ';
                oldPositionStyle += '}\n';
                oldPositionStyles += oldPositionStyle; 
                // Build new style
                var newPositionStyle = '.SurrealPost' + lis[j].toString() + ' {';                
                newPositionStyle += 'position: relative; ';
                if (Surrealist._removalTransitions.includes(lis[j])) {
                    newPositionStyle += 'opacity: 0; ';
                } else {
                    newPositionStyle += 'top: 0px; ';
                    newPositionStyle += 'left: 0px; ';
                }
                newPositionStyle += 'transition: 500ms all cubic-bezier(1.000, -0.530, 0.405, 1.425)}\n';
                newPositionStyles += newPositionStyle;
            };    
        };
        var item = document.getElementById('Surreal');
        var type = typeof item;
        if (!(type !== 'function' && type === 'object' && item && item.tagName === 'STYLE')) {
            item = document.createElement('style');
            item.setAttribute('id', 'Surreal');
            document.head.appendChild(item);        
        };
        item.innerHTML = oldPositionStyles + newPositionStyles + removalPositionStyles;
    }

    Surrealist._ApplyOldCss = function() {
        // Build the CSS transitions
        var uls = Object.keys(Surrealist._preTransitions);        
        for (var i = 0, ilen = uls.length; i < ilen; i++) {
            var lis = Object.keys(Surrealist._preTransitions[uls[i]]);
            for (var j = 0, jlen = lis.length; j < jlen; j++) {
                var item = document.getElementById(lis[j]);
                var type = typeof item;
                if (type !== 'function' && type === 'object' && item && item.tagName === 'LI') {
                    item.classList.add('SurrealPre' + lis[j].toString());
                };
            };    
        };
    }

    Surrealist._RemoveOldCss = function() {
        // Build the CSS transitions
        var uls = Object.keys(Surrealist._preTransitions);        
        for (var i = 0, ilen = uls.length; i < ilen; i++) {
            var lis = Object.keys(Surrealist._preTransitions[uls[i]]);
            for (var j = 0, jlen = lis.length; j < jlen; j++) {
                var item = document.getElementById(lis[j]);
                var type = typeof item;
                if (type !== 'function' && type === 'object' && item && item.tagName === 'LI') {
                    item.classList.remove('SurrealPre' + lis[j].toString());
                };
            };    
        };
    }

    Surrealist._ApplyNewCss = function() {
        // Build the CSS transitions
        var uls = Object.keys(Surrealist._postTransitions);        
        for (var i = 0, ilen = uls.length; i < ilen; i++) {
            var lis = Object.keys(Surrealist._postTransitions[uls[i]]);
            for (var j = 0, jlen = lis.length; j < jlen; j++) {
                var item = document.getElementById(lis[j]);
                var type = typeof item;
                if (type !== 'function' && type === 'object' && item && item.tagName === 'LI') {
                    item.classList.add('SurrealPost' + lis[j].toString());
                };
            };    
        };
    }

    Surrealist._RemoveNewCss = function() {
        // Build the CSS transitions
        var uls = Object.keys(Surrealist._postTransitions);        
        for (var i = 0, ilen = uls.length; i < ilen; i++) {
            var lis = Object.keys(Surrealist._postTransitions[uls[i]]);
            for (var j = 0, jlen = lis.length; j < jlen; j++) {
                var item = document.getElementById(lis[j]);
                var type = typeof item;
                if (type !== 'function' && type === 'object' && item && item.tagName === 'LI') {
                    item.classList.remove('SurrealPost' + lis[j].toString());
                };
            };    
        };
    }

    Surrealist._ApplyRemovals = function() {
        var lis = Surrealist._removalTransitions;
        for (var i = 0, ilen = lis.length; i < ilen; i++) {
            var item = document.getElementById(lis[i]);
            var ul = item.parentNode;
            ul.removeChild(item);
            delete Surrealist._postTransitions[ul.id][item.id];
        };
        Surrealist._removalTransitions = [];
    }

    Surrealist._FinalizeTransition = function() {
        Surrealist._RemoveOldCss();
        Surrealist._RemoveNewCss();
        Surrealist._ApplyRemovals();
        Surrealist._preTransitions = Surrealist._postTransitions;
    }

    Surrealist.Transition = function() {
        Surrealist._AnalyzeNewPositions();
        Surrealist._AnalyzeOldPositions();
        Surrealist._BuildCssTransitions();
        Surrealist._ApplyOldCss();
        setTimeout(Surrealist._ApplyNewCss, 100);
        setTimeout(Surrealist._FinalizeTransition, 600);
    }

    Surrealist.RemoveByIds = function(ul, ids) {
        if (!Array.isArray(ids)) {
            ids = [ ids ];
        };
        var removed = false;
        var itemKeys = Surrealist._GetPreItemKeys(ul, 'sequence');
        var itemsToKeep = itemKeys.filter(function(a) { return !ids.includes(a) });
        var itemsToRemove = itemKeys.filter(function(a) { return ids.includes(a) });
        if (itemsToRemove.length > 0) {
            removed = true;
        };
        if (removed) {
            Surrealist._removalTransitions = itemsToRemove;
            Surrealist._ArrangeItemElementsBySequence(ul, itemsToKeep.concat(itemsToRemove));
            window.requestAnimationFrame(Surrealist.Transition);
        };
    };

    Surrealist.Swap = function(ul, index1, index2) {
        var itemKeys = Surrealist._SortPreItemKeys(ul, 'sequence');
        if (itemKeys && itemKeys.length > 1) {
            var tempKey = itemKeys[index1];
            itemKeys[index1] = itemKeys[index2];
            itemKeys[index2] = tempKey;
            Surrealist._ArrangeItemElementsBySequence(ul, itemKeys);
            window.requestAnimationFrame(Surrealist.Transition);
        }
    };

    Surrealist.Shuffle = function(ul) {
        var itemKeys = Surrealist._GetPreItemKeys(ul);
        if (itemKeys) {
            itemKeys = Surrealist._ShuffleArray(itemKeys);
            Surrealist._ArrangeItemElementsBySequence(ul, itemKeys);
            window.requestAnimationFrame(Surrealist.Transition);
        }
    }

    Surrealist.TopToBottom = function(ul) {
        var itemKeys = Surrealist._SortPreItemKeys(ul, 'sequence');
        if (itemKeys && itemKeys.length > 1) {
            var tempKey = itemKeys.shift();
            itemKeys.push(tempKey);
            Surrealist._ArrangeItemElementsBySequence(ul, itemKeys);
            window.requestAnimationFrame(Surrealist.Transition);
        }
    }

    Surrealist.BottomToTop = function(ul) {
        var itemKeys = Surrealist._SortPreItemKeys(ul, 'sequence');
        if (itemKeys && itemKeys.length > 1) {
            itemKeys = itemKeys.reverse();
            var tempKey = itemKeys.shift();
            itemKeys.push(tempKey);
            itemKeys = itemKeys.reverse();
            Surrealist._ArrangeItemElementsBySequence(ul, itemKeys);
            window.requestAnimationFrame(Surrealist.Transition);
        }
    }

    Surrealist._ArrangeItemElementsBySequence = function(ul, ids) {
        for (var i = 0, ilen = ids.length; i < ilen; i++) {
            item = Surrealist._GetItemElement(ids[i]);
            if (item) {
                var parent = item.parentNode;
                parent.removeChild(item);
                parent.appendChild(item);
            }
        }
    }

    /*
    Surrealist.ShuffleItems = function(id) {
        var removed = false;
        var item = document.getElementById(id);
        var type = typeof item;
        if (type !== 'function' && type === 'object' && item && item.tagName === 'LI') {
            item.parentNode.removeChild(item);
            removed = true;
        };
        if (removed) {
            window.requestAnimationFrame(Surrealist.Transition);
        };
    };
    */

    Surrealist._idOffset = 0;
    Surrealist._preTransitions = {};
    Surrealist._postTransitions = {};
    Surrealist._removalTransitions = [];
    Surrealist._additionTransitions = [];

    // Add Surrealist to the browser's global object
    window.Surrealist = Surrealist;

    // Current version
    Surrealist.VERSION = '1.0.0';


})();