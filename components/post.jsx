import Image from 'next/image'
import moment from 'moment'

export default function Post({ post }) {

    function getFormattedDate(post)
    {
        let formate = new Date(post.createdAt),
            date = formate.getUTCDate(),
            hour = formate.getHours(),
            month = "January,February,March,April,May,June,July,August,October,November,December"
            .split(",")[formate.getUTCMonth()];


        function graduation(d) {
            if(d > 3 && d < 21) return 'th'; 
            switch (d % 10) {
                case 1:  return "st";
                case 2:  return "nd";
                case 3:  return "rd";
                default: return "th";
            }
        }

        return month + " " + date + graduation(date) + " at " + (hour < 12 ? hour + "am" : (hour - 12) + "pm");   
    }
    
    const postCreatedAt = new Date(post.createdAt)

    const timeNow = new Date().getTime()

    const diff = timeNow - postCreatedAt.getTime()

    console.log(postCreatedAt);
    console.log(Math.round(diff / (1000 * 60 * 60 * 24)));
    console.log(getFormattedDate(post));

    // const ddd = moment(post.created).fromNow()
    // console.log(ddd);

    
  return (
    <div className='' >
     
           
    </div>
  )
}

