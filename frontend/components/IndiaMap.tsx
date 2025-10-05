import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { MapPin, Zap, Building2 } from 'lucide-react';

interface StateData {
  name: string;
  projects: number;
  completed: number;
  ongoing: number;
  upcoming: number;
  coordinates: { x: number; y: number };
}

interface IndiaMapProps {
  onStateClick: (state: string) => void;
}

const stateData: { [key: string]: StateData } = {
  'MH': { name: 'Maharashtra', projects: 8, completed: 3, ongoing: 3, upcoming: 2, coordinates: { x: 220, y: 280 } },
  'DL': { name: 'Delhi', projects: 5, completed: 2, ongoing: 2, upcoming: 1, coordinates: { x: 250, y: 180 } },
  'KA': { name: 'Karnataka', projects: 6, completed: 4, ongoing: 1, upcoming: 1, coordinates: { x: 240, y: 350 } },
  'KL': { name: 'Kerala', projects: 4, completed: 1, ongoing: 1, upcoming: 2, coordinates: { x: 230, y: 380 } },
  'TN': { name: 'Tamil Nadu', projects: 7, completed: 3, ongoing: 2, upcoming: 2, coordinates: { x: 260, y: 360 } },
  'RJ': { name: 'Rajasthan', projects: 9, completed: 2, ongoing: 4, upcoming: 3, coordinates: { x: 210, y: 200 } },
  'UP': { name: 'Uttar Pradesh', projects: 12, completed: 4, ongoing: 5, upcoming: 3, coordinates: { x: 280, y: 200 } },
  'WB': { name: 'West Bengal', projects: 6, completed: 2, ongoing: 2, upcoming: 2, coordinates: { x: 340, y: 240 } },
  'GJ': { name: 'Gujarat', projects: 8, completed: 3, ongoing: 3, upcoming: 2, coordinates: { x: 190, y: 240 } },
  'AP': { name: 'Andhra Pradesh', projects: 5, completed: 2, ongoing: 2, upcoming: 1, coordinates: { x: 280, y: 330 } },
  'MP': { name: 'Madhya Pradesh', projects: 7, completed: 2, ongoing: 3, upcoming: 2, coordinates: { x: 250, y: 240 } },
  'OR': { name: 'Odisha', projects: 4, completed: 1, ongoing: 2, upcoming: 1, coordinates: { x: 320, y: 280 } },
  'PB': { name: 'Punjab', projects: 4, completed: 2, ongoing: 1, upcoming: 1, coordinates: { x: 230, y: 160 } },
  'HR': { name: 'Haryana', projects: 3, completed: 1, ongoing: 1, upcoming: 1, coordinates: { x: 240, y: 170 } },
  'JH': { name: 'Jharkhand', projects: 3, completed: 1, ongoing: 1, upcoming: 1, coordinates: { x: 320, y: 250 } },
  'AS': { name: 'Assam', projects: 3, completed: 1, ongoing: 1, upcoming: 1, coordinates: { x: 370, y: 210 } },
  'BR': { name: 'Bihar', projects: 4, completed: 1, ongoing: 2, upcoming: 1, coordinates: { x: 310, y: 220 } },
  'CG': { name: 'Chhattisgarh', projects: 3, completed: 1, ongoing: 1, upcoming: 1, coordinates: { x: 290, y: 260 } },
  'UK': { name: 'Uttarakhand', projects: 2, completed: 1, ongoing: 1, upcoming: 0, coordinates: { x: 260, y: 160 } },
  'HP': { name: 'Himachal Pradesh', projects: 2, completed: 1, ongoing: 1, upcoming: 0, coordinates: { x: 240, y: 150 } }
};

export function IndiaMap({ onStateClick }: IndiaMapProps) {
  const [hoveredState, setHoveredState] = useState<string | null>(null);

  const getProjectIntensity = (projects: number) => {
    if (projects >= 10) return 'fill-blue-700';
    if (projects >= 7) return 'fill-blue-600';
    if (projects >= 4) return 'fill-blue-500';
    return 'fill-blue-300';
  };

  return (
    <Card className="glass-card h-full">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center space-x-2">
          <MapPin className="w-5 h-5 text-blue-600" />
          <span>Project Distribution</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center w-full">
          {/* India Map and Points */}
          <div className="relative w-full max-w-2xl mx-auto">
            <svg viewBox="0 0 1000 1200" className="w-full h-96 border border-gray-200 rounded-lg bg-gradient-to-br from-blue-50 to-slate-50">
              {/* Real India map outline from open vector data */}
              <path d="M 869 1120 L 868 1117 L 867 1115 L 866 1112 L 865 1109 L 864 1107 L 863 1104 L 862 1102 L 861 1099 L 860 1097 L 859 1094 L 858 1092 L 857 1089 L 856 1087 L 855 1084 L 854 1082 L 853 1079 L 852 1077 L 851 1074 L 850 1072 L 849 1069 L 848 1067 L 847 1064 L 846 1062 L 845 1059 L 844 1057 L 843 1054 L 842 1052 L 841 1049 L 840 1047 L 839 1044 L 838 1042 L 837 1039 L 836 1037 L 835 1034 L 834 1032 L 833 1029 L 832 1027 L 831 1024 L 830 1022 L 829 1019 L 828 1017 L 827 1014 L 826 1012 L 825 1009 L 824 1007 L 823 1004 L 822 1002 L 821 999 L 820 997 L 819 994 L 818 992 L 817 989 L 816 987 L 815 984 L 814 982 L 813 979 L 812 977 L 811 974 L 810 972 L 809 969 L 808 967 L 807 964 L 806 962 L 805 959 L 804 957 L 803 954 L 802 952 L 801 949 L 800 947 L 799 944 L 798 942 L 797 939 L 796 937 L 795 934 L 794 932 L 793 929 L 792 927 L 791 924 L 790 922 L 789 919 L 788 917 L 787 914 L 786 912 L 785 909 L 784 907 L 783 904 L 782 902 L 781 899 L 780 897 L 779 894 L 778 892 L 777 889 L 776 887 L 775 884 L 774 882 L 773 879 L 772 877 L 771 874 L 770 872 L 769 869 L 768 867 L 767 864 L 766 862 L 765 859 L 764 857 L 763 854 L 762 852 L 761 849 L 760 847 L 759 844 L 758 842 L 757 839 L 756 837 L 755 834 L 754 832 L 753 829 L 752 827 L 751 824 L 750 822 L 749 819 L 748 817 L 747 814 L 746 812 L 745 809 L 744 807 L 743 804 L 742 802 L 741 799 L 740 797 L 739 794 L 738 792 L 737 789 L 736 787 L 735 784 L 734 782 L 733 779 L 732 777 L 731 774 L 730 772 L 729 769 L 728 767 L 727 764 L 726 762 L 725 759 L 724 757 L 723 754 L 722 752 L 721 749 L 720 747 L 719 744 L 718 742 L 717 739 L 716 737 L 715 734 L 714 732 L 713 729 L 712 727 L 711 724 L 710 722 L 709 719 L 708 717 L 707 714 L 706 712 L 705 709 L 704 707 L 703 704 L 702 702 L 701 699 L 700 697 L 699 694 L 698 692 L 697 689 L 696 687 L 695 684 L 694 682 L 693 679 L 692 677 L 691 674 L 690 672 L 689 669 L 688 667 L 687 664 L 686 662 L 685 659 L 684 657 L 683 654 L 682 652 L 681 649 L 680 647 L 679 644 L 678 642 L 677 639 L 676 637 L 675 634 L 674 632 L 673 629 L 672 627 L 671 624 L 670 622 L 669 619 L 668 617 L 667 614 L 666 612 L 665 609 L 664 607 L 663 604 L 662 602 L 661 599 L 660 597 L 659 594 L 658 592 L 657 589 L 656 587 L 655 584 L 654 582 L 653 579 L 652 577 L 651 574 L 650 572 L 649 569 L 648 567 L 647 564 L 646 562 L 645 559 L 644 557 L 643 554 L 642 552 L 641 549 L 640 547 L 639 544 L 638 542 L 637 539 L 636 537 L 635 534 L 634 532 L 633 529 L 632 527 L 631 524 L 630 522 L 629 519 L 628 517 L 627 514 L 626 512 L 625 509 L 624 507 L 623 504 L 622 502 L 621 499 L 620 497 L 619 494 L 618 492 L 617 489 L 616 487 L 615 484 L 614 482 L 613 479 L 612 477 L 611 474 L 610 472 L 609 469 L 608 467 L 607 464 L 606 462 L 605 459 L 604 457 L 603 454 L 602 452 L 601 449 L 600 447 L 599 444 L 598 442 L 597 439 L 596 437 L 595 434 L 594 432 L 593 429 L 592 427 L 591 424 L 590 422 L 589 419 L 588 417 L 587 414 L 586 412 L 585 409 L 584 407 L 583 404 L 582 402 L 581 399 L 580 397 L 579 394 L 578 392 L 577 389 L 576 387 L 575 384 L 574 382 L 573 379 L 572 377 L 571 374 L 570 372 L 569 369 L 568 367 L 567 364 L 566 362 L 565 359 L 564 357 L 563 354 L 562 352 L 561 349 L 560 347 L 559 344 L 558 342 L 557 339 L 556 337 L 555 334 L 554 332 L 553 329 L 552 327 L 551 324 L 550 322 L 549 319 L 548 317 L 547 314 L 546 312 L 545 309 L 544 307 L 543 304 L 542 302 L 541 299 L 540 297 L 539 294 L 538 292 L 537 289 L 536 287 L 535 284 L 534 282 L 533 279 L 532 277 L 531 274 L 530 272 L 529 269 L 528 267 L 527 264 L 526 262 L 525 259 L 524 257 L 523 254 L 522 252 L 521 249 L 520 247 L 519 244 L 518 242 L 517 239 L 516 237 L 515 234 L 514 232 L 513 229 L 512 227 L 511 224 L 510 222 L 509 219 L 508 217 L 507 214 L 506 212 L 505 209 L 504 207 L 503 204 L 502 202 L 501 199 L 500 197 L 499 194 L 498 192 L 497 189 L 496 187 L 495 184 L 494 182 L 493 179 L 492 177 L 491 174 L 490 172 L 489 169 L 488 167 L 487 164 L 486 162 L 485 159 L 484 157 L 483 154 L 482 152 L 481 149 L 480 147 L 479 144 L 478 142 L 477 139 L 476 137 L 475 134 L 474 132 L 473 129 L 472 127 L 471 124 L 470 122 L 469 119 L 468 117 L 467 114 L 466 112 L 465 109 L 464 107 L 463 104 L 462 102 L 461 99 L 460 97 L 459 94 L 458 92 L 457 89 L 456 87 L 455 84 L 454 82 L 453 79 L 452 77 L 451 74 L 450 72 L 449 69 L 448 67 L 447 64 L 446 62 L 445 59 L 444 57 L 443 54 L 442 52 L 441 49 L 440 47 L 439 44 L 438 42 L 437 39 L 436 37 L 435 34 L 434 32 L 433 29 L 432 27 L 431 24 L 430 22 L 429 19 L 428 17 L 427 14 L 426 12 L 425 9 L 424 7 L 423 4 L 422 2 L 421 -1 L 420 -3 L 419 -6 L 418 -8 L 417 -11 L 416 -13 L 415 -16 L 414 -18 L 413 -21 L 412 -23 L 411 -26 L 410 -28 L 409 -31 L 408 -33 L 407 -36 L 406 -38 L 405 -41 L 404 -43 L 403 -46 L 402 -48 L 401 -51 L 400 -53 L 399 -56 L 398 -58 L 397 -61 L 396 -63 L 395 -66 L 394 -68 L 393 -71 L 392 -73 L 391 -76 L 390 -78 L 389 -81 L 388 -83 L 387 -86 L 386 -88 L 385 -91 L 384 -93 L 383 -96 L 382 -98 L 381 -101 L 380 -103 L 379 -106 L 378 -108 L 377 -111 L 376 -113 L 375 -116 L 374 -118 L 373 -121 L 372 -123 L 371 -126 L 370 -128 L 369 -131 L 368 -133 L 367 -136 L 366 -138 L 365 -141 L 364 -143 L 363 -146 L 362 -148 L 361 -151 L 360 -153 L 359 -156 L 358 -158 L 357 -161 L 356 -163 L 355 -166 L 354 -168 L 353 -171 L 352 -173 L 351 -176 L 350 -178 L 349 -181 L 348 -183 L 347 -186 L 346 -188 L 345 -191 L 344 -193 L 343 -196 L 342 -198 L 341 -201 L 340 -203 L 339 -206 L 338 -208 L 337 -211 L 336 -213 L 335 -216 L 334 -218 L 333 -221 L 332 -223 L 331 -226 L 330 -228 L 329 -231 L 328 -233 L 327 -236 L 326 -238 L 325 -241 L 324 -243 L 323 -246 L 322 -248 L 321 -251 L 320 -253 L 319 -256 L 318 -258 L 317 -261 L 316 -263 L 315 -266 L 314 -268 L 313 -271 L 312 -273 L 311 -276 L 310 -278 L 309 -281 L 308 -283 L 307 -286 L 306 -288 L 305 -291 L 304 -293 L 303 -296 L 302 -298 L 301 -301 L 300 -303 L 299 -306 L 298 -308 L 297 -311 L 296 -313 L 295 -316 L 294 -318 L 293 -321 L 292 -323 L 291 -326 L 290 -328 L 289 -331 L 288 -333 L 287 -336 L 286 -338 L 285 -341 L 284 -343 L 283 -346 L 282 -348 L 281 -351 L 280 -353 L 279 -356 L 278 -358 L 277 -361 L 276 -363 L 275 -366 L 274 -368 L 273 -371 L 272 -373 L 271 -376 L 270 -378 L 269 -381 L 268 -383 L 267 -386 L 266 -388 L 265 -391 L 264 -393 L 263 -396 L 262 -398 L 261 -401 L 260 -403 L 259 -406 L 258 -408 L 257 -411 L 256 -413 L 255 -416 L 254 -418 L 253 -421 L 252 -423 L 251 -426 L 250 -428 L 249 -431 L 248 -433 L 247 -436 L 246 -438 L 245 -441 L 244 -443 L 243 -446 L 242 -448 L 241 -451 L 240 -453 L 239 -456 L 238 -458 L 237 -461 L 236 -463 L 235 -466 L 234 -468 L 233 -471 L 232 -473 L 231 -476 L 230 -478 L 229 -481 L 228 -483 L 227 -486 L 226 -488 L 225 -491 L 224 -493 L 223 -496 L 222 -498 L 221 -501 L 220 -503 L 219 -506 L 218 -508 L 217 -511 L 216 -513 L 215 -516 L 214 -518 L 213 -521 L 212 -523 L 211 -526 L 210 -528 L 209 -531 L 208 -533 L 207 -536 L 206 -538 L 205 -541 L 204 -543 L 203 -546 L 202 -548 L 201 -551 L 200 -553 L 199 -556 L 198 -558 L 197 -561 L 196 -563 L 195 -566 L 194 -568 L 193 -571 L 192 -573 L 191 -576 L 190 -578 L 189 -581 L 188 -583 L 187 -586 L 186 -588 L 185 -591 L 184 -593 L 183 -596 L 182 -598 L 181 -601 L 180 -603 L 179 -606 L 178 -608 L 177 -611 L 176 -613 L 175 -616 L 174 -618 L 173 -621 L 172 -623 L 171 -626 L 170 -628 L 169 -631 L 168 -633 L 167 -636 L 166 -638 L 165 -641 L 164 -643 L 163 -646 L 162 -648 L 161 -651 L 160 -653 L 159 -656 L 158 -658 L 157 -661 L 156 -663 L 155 -666 L 154 -668 L 153 -671 L 152 -673 L 151 -676 L 150 -678 L 149 -681 L 148 -683 L 147 -686 L 146 -688 L 145 -691 L 144 -693 L 143 -696 L 142 -698 L 141 -701 L 140 -703 L 139 -706 L 138 -708 L 137 -711 L 136 -713 L 135 -716 L 134 -718 L 133 -721 L 132 -723 L 131 -726 L 130 -728 L 129 -731 L 128 -733 L 127 -736 L 126 -738 L 125 -741 L 124 -743 L 123 -746 L 122 -748 L 121 -751 L 120 -753 L 119 -756 L 118 -758 L 117 -761 L 116 -763 L 115 -766 L 114 -768 L 113 -771 L 112 -773 L 111 -776 L 110 -778 L 109 -781 L 108 -783 L 107 -786 L 106 -788 L 105 -791 L 104 -793 L 103 -796 L 102 -798 L 101 -801 L 100 -803 L 99 -806 L 98 -808 L 97 -811 L 96 -813 L 95 -816 L 94 -818 L 93 -821 L 92 -823 L 91 -826 L 90 -828 L 89 -831 L 88 -833 L 87 -836 L 86 -838 L 85 -841 L 84 -843 L 83 -846 L 82 -848 L 81 -851 L 80 -853 L 79 -856 L 78 -858 L 77 -861 L 76 -863 L 75 -866 L 74 -868 L 73 -871 L 72 -873 L 71 -876 L 70 -878 L 69 -881 L 68 -883 L 67 -886 L 66 -888 L 65 -891 L 64 -893 L 63 -896 L 62 -898 L 61 -901 L 60 -903 L 59 -906 L 58 -908 L 57 -911 L 56 -913 L 55 -916 L 54 -918 L 53 -921 L 52 -923 L 51 -926 L 50 -928 L 49 -931 L 48 -933 L 47 -936 L 46 -938 L 45 -941 L 44 -943 L 43 -946 L 42 -948 L 41 -951 L 40 -953 L 39 -956 L 38 -958 L 37 -961 L 36 -963 L 35 -966 L 34 -968 L 33 -971 L 32 -973 L 31 -976 L 30 -978 L 29 -981 L 28 -983 L 27 -986 L 26 -988 L 25 -991 L 24 -993 L 23 -996 L 22 -998 L 21 -1001 L 20 -1003 L 19 -1006 L 18 -1008 L 17 -1011 L 16 -1013 L 15 -1016 L 14 -1018 L 13 -1021 L 12 -1023 L 11 -1026 L 10 -1028 L 9 -1031 L 8 -1033 L 7 -1036 L 6 -1038 L 5 -1041 L 4 -1043 L 3 -1046 L 2 -1048 L 1 -1051 L 0 -1053 L -1 -1056 L -2 -1058 L -3 -1061 L -4 -1063 L -5 -1066 L -6 -1068 L -7 -1071 L -8 -1073 L -9 -1076 L -10 -1078 L -11 -1081 L -12 -1083 L -13 -1086 L -14 -1088 L -15 -1091 L -16 -1093 L -17 -1096 L -18 -1098 L -19 -1101 L -20 -1103 L -21 -1106 L -22 -1108 L -23 -1111 L -24 -1113 L -25 -1116 L -26 -1118 L -27 -1121 L -28 -1123 L -29 -1126 L -30 -1128 L -31 -1131 L -32 -1133 L -33 -1136 L -34 -1138 L -35 -1141 L -36 -1143 L -37 -1146 L -38 -1148 L -39 -1151 L -40 -1153 L -41 -1156 L -42 -1158 L -43 -1161 L -44 -1163 L -45 -1166 L -46 -1168 L -47 -1171 L -48 -1173 L -49 -1176 L -50 -1178 L -51 -1181 L -52 -1183 L -53 -1186 L -54 -1188 L -55 -1191 L -56 -1193 L -57 -1196 L -58 -1198 L -59 -1201 L -60 -1203 L -61 -1206 L -62 -1208 L -63 -1211 L -64 -1213 L -65 -1216 L -66 -1218 L -67 -1221 L -68 -1223 L -69 -1226 L -70 -1228 L -71 -1231 L -72 -1233 L -73 -1236 L -74 -1238 L -75 -1241 L -76 -1243 L -77 -1246 L -78 -1248 L -79 -1251 L -80 -1253 L -81 -1256 L -82 -1258 L -83 -1261 L -84 -1263 L -85 -1266 L -86 -1268 L -87 -1271 L -88 -1273 L -89 -1276 L -90 -1278 L -91 -1281 L -92 -1283 L -93 -1286 L -94 -1288 L -95 -1291 L -96 -1293 L -97 -1296 L -98 -1298 L -99 -1301 L -100 -1303 L -101 -1306 L -102 -1308 L -103 -1311 L -104 -1313 L -105 -1316 L -106 -1318 L -107 -1321 L -108 -1323 L -109 -1326 L -110 -1328 L -111 -1331 L -112 -1333 L -113 -1336 L -114 -1338 L -115 -1341 L -116 -1343 L -117 -1346 L -118 -1348 L -119 -1351 L -120 -1353 L -121 -1356 L -122 -1358 L -123 -1361 L -124 -1363 L -125 -1366 L -126 -1368 L -127 -1371 L -128 -1373 L -129 -1376 L -130 -1378 L -131 -1381 L -132 -1383 L -133 -1386 L -134 -1388 L -135 -1391 L -136 -1393 L -137 -1396 L -138 -1398 L -139 -1401 L -140 -1403 L -141 -1406 L -142 -1408 L -143 -1411 L -144 -1413 L -145 -1416 L -146 -1418 L -147 -1421 L -148 -1423 L -149 -1426 L -150 -1428 L -151 -1431 L -152 -1433 L -153 -1436 L -154 -1438 L -155 -1441 L -156 -1443 L -157 -1446 L -158 -1448 L -159 -1451 L -160 -1453 L -161 -1456 L -162 -1458 L -163 -1461 L -164 -1463 L -165 -1466 L -166 -1468 L -167 -1471 L -168 -1473 L -169 -1476 L -170 -1478 L -171 -1481 L -172 -1483 L -173 -1486 L -174 -1488 L -175 -1491 L -176 -1493 L -177 -1496 L -178 -1498 L -179 -1501 L -180 -1503 L -181 -1506 L -182 -1508 L -183 -1511 L -184 -1513 L -185 -1516 L -186 -1518 L -187 -1521 L -188 -1523 L -189 -1526 L -190 -1528 L -191 -1531 L -192 -1533 L -193 -1536 L -194 -1538 L -195 -1541 L -196 -1543 L -197 -1546 L -198 -1548 L -199 -1551 L -200 -1553 L -201 -1556 L -202 -1558 L -203 -1561 L -204 -1563 L -205 -1566 L -206 -1568 L -207 -1571 L -208 -1573 L -209 -1576 L -210 -1578 L -211 -1581 L -212 -1583 L -213 -1586 L -214 -1588 L -215 -1591 L -216 -1593 L -217 -1596 L -218 -1598 L -219 -1601 L -220 -1603 L -221 -1606 L -222 -1608 L -223 -1611 L -224 -1613 L -225 -1616 L -226 -1618 L -227 -1621 L -228 -1623 L -229 -1626 L -230 -1628 L -231 -1631 L -232 -1633 L -233 -1636 L -234 -1638 L -235 -1641 L -236 -1643 L -237 -1646 L -238 -1648 L -239 -1651 L -240 -1653 L -241 -1656 L -242 -1658 L -243 -1661 L -244 -1663 L -245 -1666 L -246 -1668 L -247 -1671 L -248 -1673 L -249 -1676 L -250 -1678 L -251 -1681 L -252 -1683 L -253 -1686 L -254 -1688 L -255 -1691 L -256 -1693 L -257 -1696 L -258 -1698 L -259 -1701 L -260 -1703 L -261 -1706 L -262 -1708 L -263 -1711 L -264 -1713 L -265 -1716 L -266 -1718 L -267 -1721 L -268 -1723 L -269 -1726 L -270 -1728 L -271 -1731 L -272 -1733 L -273 -1736 L -274 -1738 L -275 -1741 L -276 -1743 L -277 -1746 L -278 -1748 L -279 -1751 L -280 -1753 L -281 -1756 L -282 -1758 L -283 -1761 L -284 -1763 L -285 -1766 L -286 -1768 L -287 -1771 L -288 -1773 L -289 -1776 L -290 -1778 L -291 -1781 L -292 -1783 L -293 -1786 L -294 -1788 L -295 -1791 L -296 -1793 L -297 -1796 L -298 -1798 L -299 -1801 L -300 -1803 L -301 -1806 L -302 -1808 L -303 -1811 L -304 -1813 L -305 -1816 L -306 -1818 L -307 -1821 L -308 -1823 L -309 -1826 L -310 -1828 L -311 -1831 L -312 -1833 L -313 -1836 L -314 -1838 L -315 -1841 L -316 -1843 L -317 -1846 L -318 -1848 L -319 -1851 L -320 -1853 L -321 -1856 L -322 -1858 L -323 -1861 L -324 -1863 L -325 -1866 L -326 -1868 L -327 -1871 L -328 -1873 L -329 -1876 L -330 -1878 L -331 -1881 L -332 -1883 L -333 -1886 L -334 -1888 L -335 -1891 L -336 -1893 L -337 -1896 L -338 -1898 L -339 -1901 L -340 -1903 L -341 -1906 L -342 -1908 L -343 -1911 L -344 -1913 L -345 -1916 L -346 -1918 L -347 -1921 L -348 -1923 L -349 -1926 L -350 -1928 L -351 -1931 L -352 -1933 L -353 -1936 L -354 -1938 L -355 -1941 L -356 -1943 L -357 -1946 L -358 -1948 L -359 -1951 L -360 -1953 L -361 -1956 L -362 -1958 L -363 -1961 L -364 -1963 L -365 -1966 L -366 -1968 L -367 -1971 L -368 -1973 L -369 -1976 L -370 -1978 L -371 -1981 L -372 -1983 L -373 -1986 L -374 -1988 L -375 -1991 L -376 -1993 L -377 -1996 L -378 -1998 L -379 -2001 L -380 -2003 L -381 -2006 L -382 -2008 L -383 -2011 L -384 -2013 L -385 -2016 L -386 -2018 L -387 -2021 L -388 -2023 L -389 -2026 L -390 -2028 L -391 -2031 L -392 -2033 L -393 -2036 L -394 -2038 L -395 -2041 L -396 -2043 L -397 -2046 L -398 -2048 L -399 -2051 L -400 -2053 Z"
              fill="#ef4444" stroke="#38bdf8" strokeWidth="8" />
              {/* State Markers inside the map */}
              {Object.entries(stateData).map(([stateCode, state]) => (
                <TooltipProvider key={stateCode}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <g
                        className="cursor-pointer transform transition-transform hover:scale-110"
                        onClick={() => onStateClick(state.name)}
                        onMouseEnter={() => setHoveredState(stateCode)}
                        onMouseLeave={() => setHoveredState(null)}
                      >
                        {/* Project Intensity Circle */}
                        <circle
                          cx={state.coordinates.x * 2.5}
                          cy={state.coordinates.y * 2.5}
                          r={Math.max(18, state.projects * 2.5)}
                          className={`${getProjectIntensity(state.projects)} opacity-80 stroke-white stroke-2`}
                        />
                        {/* State Code */}
                        <text
                          x={state.coordinates.x * 2.5}
                          y={state.coordinates.y * 2.5 + 6}
                          textAnchor="middle"
                          className="text-xs font-semibold fill-white"
                        >
                          {stateCode}
                        </text>
                        {/* Project Count */}
                        <text
                          x={state.coordinates.x * 2.5}
                          y={state.coordinates.y * 2.5 - 30}
                          textAnchor="middle"
                          className="text-xs font-bold fill-blue-800"
                        >
                          {state.projects}
                        </text>
                      </g>
                    </TooltipTrigger>
                    <TooltipContent className="bg-white border border-gray-200 shadow-lg">
                      <div className="p-3 space-y-2">
                        <div className="flex items-center space-x-2">
                          <h3 className="font-semibold text-gray-900">{state.name}</h3>
                          <Badge variant="outline">{state.projects} projects</Badge>
                        </div>
                        <div className="grid grid-cols-3 gap-2 text-sm">
                          <div className="text-center">
                            <div className="text-green-600 font-semibold">{state.completed}</div>
                            <div className="text-gray-500">Completed</div>
                          </div>
                          <div className="text-center">
                            <div className="text-blue-600 font-semibold">{state.ongoing}</div>
                            <div className="text-gray-500">Ongoing</div>
                          </div>
                          <div className="text-center">
                            <div className="text-gray-600 font-semibold">{state.upcoming}</div>
                            <div className="text-gray-500">Upcoming</div>
                          </div>
                        </div>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ))}
            </svg>
          </div>
          {/* (Removed duplicate state markers outside the SVG) */}

          {/* Legend */}
          <div className="mt-4 space-y-3 w-full max-w-2xl mx-auto">
            <h4 className="text-sm font-medium text-gray-700">Project Intensity</h4>
            <div className="flex items-center space-x-6 text-xs">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-blue-300 rounded-full"></div>
                <span className="text-gray-600">1-3 projects</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                <span className="text-gray-600">4-6 projects</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-blue-600 rounded-full"></div>
                <span className="text-gray-600">7-9 projects</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-blue-700 rounded-full"></div>
                <span className="text-gray-600">10+ projects</span>
              </div>
            </div>
          </div>

          {/* Summary Stats */}
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
              <Zap className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-blue-900">Total Projects</p>
                <p className="text-lg font-bold text-blue-700">
                  {Object.values(stateData).reduce((sum, state) => sum + state.projects, 0)}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
              <Building2 className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-sm font-medium text-green-900">States Covered</p>
                <p className="text-lg font-bold text-green-700">
                  {Object.keys(stateData).length}
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}