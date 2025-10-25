const apiData= 'AIzaSyApcVkPKKOT9Qn5i7KY92iZJY5iccq7kgA';


  function CountViews(views) {
   views = Number(views); // Convert to number

    if (views >= 1000000) {
    return (views / 1000000).toFixed(1) + 'M';
    }
     else if (views >= 1000) {
    return (views / 1000).toFixed(1) + 'K';
    } 
    else {
    return views;
    }
}
export default CountViews;