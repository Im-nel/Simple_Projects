var operation = null;
var previousValue = null;

function buttonClicked(buttonId) {
    var display = document.getElementById('calculator__display');
    var buttonValue = buttonId.slice(1); 

    switch(buttonId) {
        case 'B1':
        case 'B2':
        case 'B3':
        case 'B4':
        case 'B5':
        case 'B6':
        case 'B7':
        case 'B8':
        case 'B9':
        case 'B0':
                if (display.innerHTML.length < 21) { 
                    if (display.innerHTML === '0') {
                        display.innerHTML = buttonValue;
                    } else {
                        display.innerHTML += buttonValue;
                    }
                    adjustFontSize();
                }
                break;
                case 'BAC':
            display.innerHTML = '0';
            display.style.fontSize = "80px"; 
            break;
            case 'BToggle':
                if (display.innerHTML !== '0' && display.innerHTML !== '-0') {
                    display.innerHTML = display.innerHTML.startsWith('-') ? display.innerHTML.slice(1) : '-' + display.innerHTML;
                }
                break;
            case 'BPR':
                display.innerHTML = parseFloat(display.innerHTML) / 100;
                break;
            case 'BPlus':
            case 'BMinus':
            case 'BX':
            case 'BDV':
                previousValue = parseFloat(display.innerHTML);
                operation = buttonId;
                display.innerHTML = '0';
                break;
        case 'BComma':
            if (!display.innerHTML.includes('.')) {
                display.innerHTML += '.';
            }
            break;
                        case 'BEqual':
                        if (previousValue !== null && operation !== null) {
                            var currentValue = parseFloat(display.innerHTML);
                            switch(operation) {
                                case 'BPlus':
                                    display.innerHTML = previousValue + currentValue;
                                    break;
                                case 'BMinus':
                                    display.innerHTML = previousValue - currentValue;
                                    break;
                                case 'BX':
                                    display.innerHTML = previousValue * currentValue;
                                    break;
                                case 'BDV':
                                    if (currentValue !== 0) {
                                        display.innerHTML = previousValue / currentValue;
                                    } else {
                                        display.innerHTML = 'Error';
                                    }
                                    break;
                            }
                            previousValue = null;
                            operation = null;
                            adjustFontSize();

                            if (display.innerHTML.length >= 5) {
                                var currentFontSize = parseFloat(display.style.fontSize.slice(0, -2));
                                display.style.fontSize = (currentFontSize - 20) + 'px';
                            }
                        }
                        break;
                }
            }
        function adjustFontSize() {
            var display = document.getElementById('calculator__display');
            var container = document.querySelector('.display-container');

            var temp = document.createElement('div');
            temp.style.position = 'absolute';
            temp.style.whiteSpace = 'nowrap';
            temp.style.fontSize = window.getComputedStyle(display, null).getPropertyValue('font-size');
            temp.innerHTML = display.innerHTML;
            document.body.appendChild(temp);

            var textWidth = temp.offsetWidth;
            var containerWidth = container.offsetWidth;

            document.body.removeChild(temp);

            var style = window.getComputedStyle(display, null).getPropertyValue('font-size');
            var fontSize = parseFloat(style);

            if (textWidth >= containerWidth) {
                display.style.fontSize = (fontSize - 5) + "px";
            }
            else if (textWidth < containerWidth - 50 && fontSize < 80) {
                display.style.fontSize = (fontSize + 5) + "px";
            }
        }