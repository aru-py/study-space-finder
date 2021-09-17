![studyspacefinder](https://user-images.githubusercontent.com/37231424/133843667-97c1ac6e-a441-4086-8604-ff035b29641b.jpeg)

<p align="center">
  <b>Find unused classrooms to study in Clemson University</b>
 </p>

## Overview
It’s sometimes difficult to find a quiet study space on Clemson University’s 
campus. This web app uses course registration data to find periods in which
campus classrooms are being unused, whether you just need a spot to unwind 
between classes or hours of uninterrupted silence. The goal of this project
was to help reduce overcrowding at Cooper Library, and after surveying 
hundreds of students, it was proposed to the university in March of 2020.  

<br>
<img width="50%" src="/docs/study_space_finder.gif"></img>

## Data
The data for this site was collected by scraping the university's course registration portal,
which includes information about courses, their classrooms, and timings. The data is not included
in the repository.

**Example Data**
```
 {
    "room": "Hogwarts Dungeon Five",
    "courses": [
      {
        "index": 885,
        "course": "Muggle Studies",
        "days": [
          1,
          3,
          5
        ],
        "times": [
          "08:00",
          "08:50"
        ]
      },
      {
        "index": 17,
        "course": "Transfiguration",
        "days": [
          2,
          4
        ],
        "times": [
          "08:00",
          "09:15"
        ]
      }]
  }
```

## Notes
Unfortunately, the university was not in a position to accept the proposal due to factors such as safety
that would have to be considered. I want to thank everyone involved for the support they offered.

## Contributing
If you find an issue or believe a feature should be added, please reach out and I will look into it. If you are a current student, you can help keep the site up to date by sending data from the course registration portal.


