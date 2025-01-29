import os
from pathlib import Path
from mutagen.wave import WAVE

SONGS_DIR = "songs"
SONGS_HTML = "songs.html"

def get_song_duration(file_path):
    """Returns the duration of the WAV file in MM:SS format."""
    try:
        audio = WAVE(file_path)
        duration = int(audio.info.length)
        minutes, seconds = divmod(duration, 60)
        return f"{minutes}:{seconds:02d}"
    except Exception as e:
        print(f"Error reading {file_path}: {e}")
        return "Unknown"

def generate_song_html():
    """Scans the songs directory and generates the necessary HTML."""
    song_entries = []
    
    for filename in sorted(os.listdir(SONGS_DIR)):  # Sort for consistent order
        if filename.endswith(".wav"):
            file_path = Path(SONGS_DIR, filename).as_posix()  # Ensure forward slashes
            song_name = os.path.splitext(filename)[0].replace("_", " ").title()
            duration = get_song_duration(file_path)
            
            song_html = f'''
            <div class="song" onclick="addToQueue('{file_path}', '{song_name}')" data-src="{file_path}">
              <h2>{song_name} <span class="song-time">({duration})</span></h2>
              <button class="download-btn" onclick="event.stopPropagation(); downloadSong('{file_path}')">⬇</button>
            </div>
            '''
            song_entries.append(song_html)

    return "\n".join(song_entries)

def update_songs_html():
    """Updates the songs.html file with the new song list."""
    try:
        with open(SONGS_HTML, "r", encoding="utf-8") as file:
            html_content = file.read()

        start_marker = '<div id="songs-container">'
        end_marker = '</div>\n  </div>'

        start_index = html_content.find(start_marker)
        end_index = html_content.find(end_marker, start_index) + len(end_marker)

        if start_index == -1 or end_index == -1:
            print("Error: Could not find the songs container in HTML.")
            return

        # Replace old song list with new one
        new_html = f'{start_marker}\n{generate_song_html()}\n  {end_marker}'
        updated_content = html_content[:start_index] + new_html + html_content[end_index:]

        with open(SONGS_HTML, "w", encoding="utf-8") as file:
            file.write(updated_content)

        print("Successfully updated songs.html!")

    except Exception as e:
        print(f"Error updating songs.html: {e}")

if __name__ == "__main__":
    update_songs_html()
