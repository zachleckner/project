// anotherFile.js

class Producer {
    constructor(playList, producers) {
        this.playList = playList;
        this.producers = producers;
    }

    selectProducer(producerName) {
        // Redirect to producer2.html and pass the producer name
        window.location.href = `/Producer2?producer=${encodeURIComponent(producerName)}`;
    }

    initialize() {
        let ul = document.getElementById("djList");
        if (ul) {
            for (let producer in this.producers) {
                if (this.producers.hasOwnProperty(producer)) {
                    let li = document.createElement("li");
                    li.textContent = producer;
                    li.addEventListener("click", () => {
                        this.selectProducer(producer);
                    });
                    ul.appendChild(li);
                }
            }
        }
    }
}

fetch('/api/data')
    .then(response => response.json())
    .then(data => {
        const { playList, producers } = data;
        let producer = new Producer(playList, producers);
        producer.initialize();
    })
    .catch(error => console.error('Error fetching data:', error));

