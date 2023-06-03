package com.example.SpringBoot.director;

import com.example.SpringBoot.utils.ImageModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;
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

    public Director addDirector(Director director) {
        Optional<Director> directorExist = directorRepository.checkExistsDirector(director.getName(), director.getSurname());
        if (directorExist.isPresent()) {
            throw new IllegalStateException("Director :" + director.getName() + " " + director.getSurname() + " exist!");
        }
        directorRepository.save(director);
        return director;
    }

    public ResponseEntity deleteDirector(Long directorId) {
        boolean exist = directorRepository.existsById(directorId);
        if (!exist) {
            throw new IllegalStateException("Director with id: " + directorId + " does not exist !");
        }
        directorRepository.deleteById(directorId);
        return new ResponseEntity("Director deleted successfully.", HttpStatus.OK);
    }

    @Transactional
    public Director updateDirector(Long directorId, Director directorJson, List<ImageModel> images) {
        Director director = getDirector(directorId);
        if (directorJson.getName() != null && directorJson.getName().length() > 0 &&
                !Objects.equals(director.getName(), directorJson.getName())) {
            director.setName(directorJson.getName());
        }

        if (directorJson.getSurname() != null && directorJson.getSurname().length() > 0 &&
                !Objects.equals(director.getSurname(), directorJson.getSurname())) {
            director.setSurname(directorJson.getSurname());
        }
        if (!Arrays.equals(director.getDirectorImage().get(0).getPicByte(), images.get(0).getPicByte())) {
            director.setDirectorImage(images);
        }

        return director;
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
