[![Netlify Status](https://api.netlify.com/api/v1/badges/491bc452-756e-4494-b617-80d828244c11/deploy-status)](https://app.netlify.com/sites/react-ketcher/deploys)

# EPAM Ketcher projects
Copyright (c) 2018 EPAM Systems, Inc

Ketcher is an open-source web-based chemical structure editor incorporating high performance, good portability, light weight, and ability to easily integrate into a custom web-application. Ketcher is designed for chemists, laboratory scientists and technicians who draw structures and reactions.

## KEY FEATURES
* Fast 2D structure representation that satisfies common chemical drawing standards
* 3D structure visualization
* Draw and edit structures using major tools: Atom Tool, Bond Tool, and Template Tool
* Template library (including custom and user's templates)
* Add atom and bond basic properties and query features, add aliases and Generic groups
* Select, modify, and erase connected and unconnected atoms and bonds using Selection Tool, or using Shift key
* Simple Structure Clean up Tool (checks bonds length, angles and spatial arrangement of atoms) and Advanced Structure Clean up Tool (+ stereochemistry checking and structure layout) 
* Aromatize/De-aromatize Tool
* Calculate CIP Descriptors Tool
* Structure Check Tool
* MW and Structure Parameters Calculate Tool 
* Stereochemistry support during editing, loading, and saving chemical structures
* Storing history of actions, with the ability to rollback to previous state
* Ability to load and save structures and reactions in MDL Molfile or RXN file format, InChI String, ChemAxon Extended SMILES, ChemAxon Extended CML file formats
* Easy to use R-Group and S-Group tools (Generic, Multiple group, SRU polymer, peratom, Data S-Group) 
* Reaction Tool (reaction generating, manual and automatic atom-to-atom mapping) 
* Flip/Rotate Tool
* Zoom in/out, hotkeys, cut/copy/paste
* OCR - ability to recognize structures at pictures (image files) and reproduce them
* Copy and paste between different chemical editors
* Settings support (Rendering, Displaying, Debugging)
* Use of SVG to achieve best quality in-browser chemical structure rendering
* Languages: JavaScript with third-party libraries

## Build instructions
Please read [DEVNOTES.md](DEVNOTES.md) for details.

## Run instructions

* Launch Indigo Service with 
`docker run --restart=always -d -p 8002:8002 -e "INDIGO_UWSGI_RUN_PARAMETERS=--plugin python3 --py-autoreload=1" -e "PYTHONPATH=/srv/indigo-python" -e "PYTHONDONTWRITEBYTECODE=1" --name=indigo_service epmlsop/indigo_service:latest /bin/sh -c "supervisord -n"`
* `npm run start`
* Open browser on http://localhost:9966/?api_path=https://lifescience.opensource.epam.com/v2/ (check actual port in the terminal)


## License
Please read [LICENSE](LICENSE) and [NOTICE](NOTICE) for details.
