package com.example.SpringBoot.director;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class DirectorService {
    private final DirectorRepository directorRepository;

    @Autowired
    public DirectorService(DirectorRepository directorRepository) {
        this.directorRepository = directorRepository;
    }

    public List<Director> getDirectors() {
        return directorRepository.findAll();
    }

    public void addDirector(Director director) {
        Optional<Director> directorExist = directorRepository.checkExistsDirector(director.getName(), director.getSurname());
        if (directorExist.isPresent()) {
            throw new IllegalStateException("Director :" + director.getName() + " " + director.getSurname() + " exist!");
        }
        directorRepository.save(director);
    }

    public void deleteDirector(Long directorId) {
        boolean exist = directorRepository.existsById(directorId);
        if (!exist) {
            throw new IllegalStateException("Director with id: " + directorId + " does not exist !");
        }
        directorRepository.deleteById(directorId);
    }

    @Transactional
    public void updateDirector(Long directorId, String name, String surname) {
        Director director = getDirector(directorId);
        if (name != null && name.length() > 0 &&
                !Objects.equals(director.getName(), name)) {
            director.setName(name);
        }

        if (surname != null && surname.length() > 0 &&
                !Objects.equals(director.getSurname(), surname)) {
            director.setSurname(surname);
        }
    }

    public byte[] getImage(Long directorId) {
        Director director = getDirector(directorId);
        return director.getDirectorImage().get(0).getPicByte();
    }

    private Director getDirector(Long directorId) {
        return directorRepository.findById(directorId)
                .orElseThrow(() -> new IllegalStateException(
                        "Director with id: " + directorId + " doesn't exist!"
                ));
    }
}
