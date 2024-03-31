const urlParams = new URLSearchParams(window.location.search);
const producerName = urlParams.get('producer');
if (producerName) {
    fetch('/api/data')
    .then(response => response.json())
    .then(data => {
    class DJ {
        constructor(playList, timeSlots) {
            this.playList = playList;
            this.timeSlots = timeSlots;
        }

        createSelect(playList, song, selectedValue) {
            let select = document.createElement('select');
            playList.map(value => {
                let option = document.createElement('option');
                option.text = value;
                option.value = value;
                option.selected = (value === song);
                select.add(option);
            });
            select.addEventListener('change', function () {
                selectedValue(this.value);
            });
            return select;
        }

        addSong(djName, slotIndex, selectedValue) {
            this.timeSlots[djName][slotIndex].songs.push(selectedValue);
            this.closePopup();
            this.openPopup(djName, slotIndex);
        }

        removeSong(djName, slotIndex, songIndex) {
            this.timeSlots[djName][slotIndex].songs.splice(songIndex, 1);
            this.closePopup();
            this.openPopup(djName, slotIndex);
        }

        closePopup() {
            let popup = document.querySelector('.popup');
            popup.style.display = 'none';
        }

        openPopup(djName, slotIndex) {
            let popup = document.querySelector('.popup');
            popup.style.display = 'block';
            let ul = document.getElementById('songList');
            ul.innerHTML = '';
            let currentSongs = this.timeSlots[djName][slotIndex].songs;
            currentSongs.forEach((song, songIndex) => {
                let li = document.createElement('li');
                let select = this.createSelect(this.playList, song, (selectedValue) => {
                    currentSongs[songIndex] = selectedValue;
                });
                li.appendChild(select);
                let removeButton = document.createElement('button');
                removeButton.innerText = 'Remove';
                removeButton.addEventListener('click', () => {
                    this.removeSong(djName, slotIndex, songIndex);
                });
                li.appendChild(removeButton);
                ul.appendChild(li);
            });

            let li = document.createElement('li');
            let select = this.createSelect(this.playList, 'notSelectedValue', (selectedValue) => {
                this.addSong(djName, slotIndex, selectedValue);
            });
            li.appendChild(select);
            ul.appendChild(li);

            let closeButton = document.querySelector('.popup .closeButton');
            closeButton.addEventListener('click', this.closePopup);
        }

        timeSlot(slots, djName) {
            let column = document.getElementById("djColumn");
            column.innerHTML = slots.map((slot, index) => {
                return `<row class="rSlot">date: ${slot.date} start: ${slot.start} end: ${slot.end} <button class="editButton">Edit</button></row>`;
            }).join('');
        
            // Adding event listeners to all edit buttons
            let editButtons = column.querySelectorAll('.editButton');
            editButtons.forEach((button, index) => {
                button.addEventListener('click', () => {
                    producer.openPopup(djName, index);
                });
            });
        }
        

        selectDJ(selectedDJSlot) {
            document.querySelectorAll("#djList li").forEach(li => li.style.border = "2px solid black");
            selectedDJSlot.style.border = "1px solid green";
            let selectedDJ = selectedDJSlot.textContent;
            let slots = this.timeSlots[selectedDJ];
            this.timeSlot(slots, selectedDJ);
        }

        initialize() {
            let ul = document.getElementById("djList");
            // Check if djList exists before creating
            if (ul) {
                ul.innerHTML = Object.keys(this.timeSlots).map(dj => `<li>${dj}</li>`).join('');
                document.querySelectorAll("#djList li").forEach(li => {
                    li.addEventListener("click", () => {
                        this.selectDJ(li);
                    });
                });
            }
        }
    }



        const { playList, producers } = data;
        let timeSlotsPartial = {};
        Object.keys(producers[producerName]).forEach(dj => {
            timeSlotsPartial[dj] = producers[producerName][dj];
        });
        let producer = new DJ(playList, timeSlotsPartial);
        producer.initialize();
    })
    .catch(error => console.error('Error fetching data:', error));


}

