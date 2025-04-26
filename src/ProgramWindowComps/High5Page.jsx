export default function High5Page() {
    return (
        <>
            <div className="flex flex-row bg-gray-900 text-gray-200 p-3 font-mono overflow-auto h-full whitespace-pre-wrap">
                <div className="basis-1/2 m-2">
                    <p>High5 was, or is, a piece of software used by my highschool to monitor hall passes, attendance, and other such things. In the spirit 
                        of breaking stuff, I decided to have my own look at it my senior year. After firing up BurpSuite and with a few hours of messing around, I had generated 8 hour long car passes,
                        signed friends out of the building, and worst of all revealed a boat-load of confidential information on students.
                    </p>
                    <br></br>
                    <p>
                        High5 had not validated access to its Firebase. Like not at all. Any student with any auth token could access any table in the entire database, ALONG with WRITE ACCESS!
                        Eventually I was able to change the quote of the day on the /qotd endpoint, which is shown to all users on the platform. Naturally, because why should any developer anticipate
                        little rats messing with their stuff, that quote of the day was open to full XSS. Really a blast.
                    </p>
                    <br></br>
                    <p>
                        I'm not evil. I reported all of this to the company with a burner proton mail account and got some corny response back like "I doubt this E-mail will reach you, but good job".
                        That email obviously reached me, love you Tim but please stop writing like that!
                    </p>
                </div>
                <div className="basis-1/2 flex flex-cols justify-center m-2">
                    <div className="text-gray-300 font">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIMA39TPqxhUfseHOLjfSgZgyf-ws7TbGHQ-ooI4VrnxPOw7iWwWXN6VIcGskmVeb1jrU&usqp=CAU"></img>
                    </div>
                </div>
            </div>
        </>
    )
}