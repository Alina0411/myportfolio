import {
  Component,
  AfterViewInit,
  ElementRef,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ABOUT_DATA } from '../../data/timeline.data';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-about',
  standalone: true,
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutComponent implements AfterViewInit, OnDestroy {
  @ViewChild('aboutSection') aboutSection!: ElementRef<HTMLElement>;
  data = ABOUT_DATA;
  private ctx?: gsap.Context;

  ngAfterViewInit(): void {
    const mm = gsap.matchMedia();

    this.ctx = gsap.context(() => {
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        // Header
        gsap.to('.about__header', {
          opacity: 1,
          duration: 0.5,
          scrollTrigger: {
            trigger: this.aboutSection.nativeElement,
            start: 'top 80%',
          },
        });

        // Profile card
        gsap.to('.about__profile', {
          opacity: 1,
          x: 0,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.about__profile',
            start: 'top 80%',
          },
        });

        // Skill categories stagger
        gsap.utils.toArray<HTMLElement>('.about__category').forEach((cat, i) => {
          gsap.to(cat, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            delay: i * 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: cat,
              start: 'top 85%',
            },
          });
        });
      });

      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set('.about__header, .about__profile, .about__category', {
          opacity: 1,
          x: 0,
          y: 0,
        });
      });
    }, this.aboutSection.nativeElement);
  }

  ngOnDestroy(): void {
    this.ctx?.revert();
  }
}
