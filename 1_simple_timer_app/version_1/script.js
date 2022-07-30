function startTimer(){
    duration = document.getElementById("duration").value;


    // convert the duration to seconds
    // h in seconds = h x 3600
    // m in seconds = m x 60
    // s
    const durationArray = duration.split(":")
    let countDownDuration = 0;

    durationArray.reverse().forEach((item, index) => {
        if(index > 0){
            countDownDuration += parseInt(item) * (60 ** parseInt(index));
        } else {
            countDownDuration += parseInt(item);
        }
    })

    // update the html to show the timer stuff
    document.getElementById("countDownTimer").innerHTML = getTime(countDownDuration);
    document.getElementById("countDownTimerDetails").setAttribute("hidden", "");
    document.getElementById("countDownTimer").removeAttribute("hidden");

    let x = setInterval(function() {
        countDownDuration--;
        
        document.getElementById("countDownTimer").innerHTML = getTime(countDownDuration);

        if(countDownDuration == 0){
            clearInterval(x);
            alert("Timer complete");
        }

    }, 1000);
}

/**
 * 
 * Converts seconds to hours, minutes and seconds
 * 
 * @param {number} countDownDuration Amount of seconds still remaining in the countdown
 * @return {string} duration A string the format hh:mm:ss
 */
function getTime(countDownDuration){
    const hours = Math.floor((countDownDuration % (60 * 60 * 24)) / (60 * 60));
    const minutes = Math.floor((countDownDuration % (60 * 60)) / (60));
    const seconds = Math.floor((countDownDuration % (60)));

    return hours + ":" + minutes + ":" + seconds;
}