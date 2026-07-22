import {
  Component,
  AfterViewInit,
  ElementRef,
  ViewChild,
  ViewChildren,
  QueryList,
  OnDestroy,
} from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TimelineCardComponent } from '../timeline-card/timeline-card.component';
import { TIMELINE_DATA, TimelineStage } from '../../data/timeline.data';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-timeline',
  standalone: true,
  imports: [TimelineCardComponent],
  templateUrl: './timeline.component.html',
  styleUrl: './timeline.component.scss',
})
export class TimelineComponent implements AfterViewInit, OnDestroy {
  @ViewChild('timelineSection') timelineSection!: ElementRef<HTMLElement>;
  @ViewChild('wireFill') wireFill!: ElementRef<HTMLElement>;
  @ViewChild('wirePulse') wirePulse!: ElementRef<HTMLElement>;
  @ViewChildren('cards', { read: ElementRef }) cards!: QueryList<ElementRef>;
  @ViewChildren('nodes', { read: ElementRef }) nodes!: QueryList<ElementRef>;

  stages: TimelineStage[] = TIMELINE_DATA;
  private ctx?: gsap.Context;

  ngAfterViewInit(): void {
    const mm = gsap.matchMedia();

    this.ctx = gsap.context(() => {
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        // Header
        gsap.to('.tl__header', {
          opacity: 1,
          duration: 0.6,
          scrollTrigger: {
            trigger: '.tl__header',
            start: 'top 85%',
          },
        });

        // Wire fill on scroll
        gsap.to(this.wireFill.nativeElement, {
          height: '100%',
          ease: 'none',
          scrollTrigger: {
            trigger: this.timelineSection.nativeElement,
            start: 'top 60%',
            end: 'bottom 30%',
            scrub: 1.5,
          },
        });

        // Pulse traveling down the wire
        gsap.to(this.wirePulse.nativeElement, {
          top: '100%',
          opacity: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: this.timelineSection.nativeElement,
            start: 'top 60%',
            end: 'bottom 30%',
            scrub: 1.5,
          },
        });

        // Cards, nodes, connectors
        this.cards.forEach((card, i) => {
          const el = card.nativeElement;
          const cardInner = el.querySelector('.card');
          const node = this.nodes.get(i)?.nativeElement;
          const connector = el.parentElement?.querySelector('.tl__connector') as HTMLElement;

          // Card
          if (cardInner) {
            gsap.to(cardInner, {
              opacity: 1,
              x: 0,
              duration: 0.8,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: el,
                start: 'top 80%',
                toggleActions: 'play none none none',
              },
            });
          }

          // Node
          if (node) {
            gsap.to(node, {
              scale: 1,
              duration: 0.5,
              ease: 'back.out(2)',
              scrollTrigger: {
                trigger: el,
                start: 'top 80%',
                toggleActions: 'play none none none',
                onEnter: () => node.classList.add('active'),
              },
            });
          }

          // Connector
          if (connector) {
            gsap.to(connector, {
              opacity: 0.6,
              duration: 0.4,
              delay: 0.3,
              scrollTrigger: {
                trigger: el,
                start: 'top 80%',
                toggleActions: 'play none none none',
              },
            });
          }

          // Stagger skill chips
          const chips = cardInner?.querySelectorAll('app-skill-tag');
          if (chips?.length) {
            gsap.fromTo(chips,
              { opacity: 0, y: 10 },
              {
                opacity: 1,
                y: 0,
                stagger: 0.04,
                duration: 0.35,
                ease: 'power2.out',
                scrollTrigger: {
                  trigger: el,
                  start: 'top 70%',
                  toggleActions: 'play none none none',
                },
              }
            );
          }
        });
      });

      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set('.tl__header', { opacity: 1 });
        gsap.set(this.wireFill.nativeElement, { height: '100%' });
        this.cards.forEach((card) => {
          const cardInner = card.nativeElement.querySelector('.card');
          if (cardInner) gsap.set(cardInner, { opacity: 1, x: 0 });
        });
        this.nodes.forEach((node) => {
          gsap.set(node.nativeElement, { scale: 1 });
          node.nativeElement.classList.add('active');
        });
      });
    }, this.timelineSection.nativeElement);
  }

  ngOnDestroy(): void {
    this.ctx?.revert();
  }
}
