package com.example.demo.dto;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class SectorDTO {
    @NotBlank(message = "The name can't be null or empty")
	private String name;
	private Boolean deleted;
}
