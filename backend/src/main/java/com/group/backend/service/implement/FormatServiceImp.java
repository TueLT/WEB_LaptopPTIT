package com.group.backend.service.implement;

import com.group.backend.dto.LaptopSummaryDTO;
import com.group.backend.service.FormatService;
import org.springframework.stereotype.Service;

import java.text.Normalizer;
import java.util.List;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

@Service
public class FormatServiceImp implements FormatService {

    @Override
    public int priceFormat(int price) {
        price /= 100000;
        price = Math.round(price) * 100000;
        return price;
    }

    @Override
    public String cpuFormat(String text) {
        String res = "";
        for(char c : text.toCharArray()) {
            if(c == '(') break;
            res += c;
        }
        return res.trim();
    }

    @Override
    public String screenFormat(String text) {
        String res = "";
        for(char c : text.toCharArray()) {
            if(c == '(') break;
            res += c;
        }
        return res.trim();
    }

    @Override
    public String vgaFormat(String text) {
        String res = "";
        String tmp[] = text.split(" ");
        if(tmp.length <= 4) {
            for (String s : tmp) {
                res += s + " ";
            }
        }else{
            for(String s : tmp) {
                if(s.contains("GB")) break;
                res += s + " ";
            }
        }
        return res.trim();
    }

    @Override
    public String ramFormat(String text) {
        String tmp[] = text.split(" ");
        return tmp[0];
    }

    @Override
    public String romFormat(String text) {
        String tmp[] = text.split(" ");
        if(!Character.isAlphabetic(tmp[1].charAt(tmp[1].length() - 1)));
        return tmp[1].substring(0, tmp[1].length());
    }

    @Override
    public String laptopNameFormat(String text) {
        String tmp = text.replace(" ", "");
        return tmp;
    }

    @Override
    public String imgTypeFormat(String text) {
        int index = text.lastIndexOf("/");
        return "." + text.substring(index + 1);
    }

    @Override
    public String filterConditionFormat(String text) {
        String tmp[] = text.split("-");
        String res = "";
        for(String s : tmp) {
            res += s + " ";
        }
        return res.trim();
    }

    @Override
    public String removeSignFromTextFormat(String text) {
        text = text.replace(" ", "-");
        String noSignText = Normalizer.normalize(text, Normalizer.Form.NFD);
        return Pattern.compile("\\p{InCombiningDiacriticalMarks}+")
                .matcher(noSignText)
                .replaceAll("");
    }

    @Override
    public LaptopSummaryDTO formattedLaptopSummary(LaptopSummaryDTO laptopSummaryDTO) {
        laptopSummaryDTO.getSpecification().setRam(ramFormat(laptopSummaryDTO.getSpecification().getRam()));
        laptopSummaryDTO.getSpecification().setCpu(cpuFormat(laptopSummaryDTO.getSpecification().getCpu()));
        laptopSummaryDTO.getSpecification().setRom(romFormat(laptopSummaryDTO.getSpecification().getRom()));
        laptopSummaryDTO.getSpecification().setGraphicsCard(vgaFormat(laptopSummaryDTO.getSpecification().getGraphicsCard()));
        laptopSummaryDTO.getSpecification().setScreen(screenFormat(laptopSummaryDTO.getSpecification().getScreen()));
        return laptopSummaryDTO;
    }


    @Override
    public List<LaptopSummaryDTO> listOfFormattedLaptopSummary(List<LaptopSummaryDTO> laptops) {
        return laptops.stream()
                .map(l -> {
                    l.getSpecification().setCpu(cpuFormat(l.getSpecification().getCpu()));
                    l.getSpecification().setRom(romFormat(l.getSpecification().getRom()));
                    l.getSpecification().setRam(ramFormat(l.getSpecification().getRam()));
                    l.getSpecification().setScreen(screenFormat(l.getSpecification().getScreen()));
                    l.getSpecification().setGraphicsCard(vgaFormat(l.getSpecification().getGraphicsCard()));
                    return l;
                })
                .collect(Collectors.toList());
    }
}
