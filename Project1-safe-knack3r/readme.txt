Andreas Schw�rer Matr. 763833 SWB4	MCI2	Projekt 1 - Touch Spiel Implementierung

Installationshinweis:
Das gesamte Spiel "Safe-Knack3r" kann ohne Installation gespielt werden. Ben�tigt wird nur ein Browser. Erfolgreich getestet wurde es mit Edge und Firefox.

Gebrauchshinweis:
Ich empfehle das Spiel mit einem Tablet zu spielen. Im vollen Umfang getestet wurde es nur auf meinem Notebook mit einer Aufl�sung von 1920x1080 und touchf�higem Bildschirm. Das Spiel wurde nicht mit einem kleineren Bildschirm getestet und k�nnte bei kleineren Displays Darstellungsfehler enthalten.
Das Spiel hat Tutorial Nachrichten. Wo keine sind sollten auch keine n�tig sein.

Konzept/Realit�t:
Im Konzept war die Idee, das Rad in beliebige Richtungen drehen zu k�nnen. Durch Schwierigkeiten bei der Implementierung musste ich vom Konzept abweichen. Die Grundidee ist da, aber insgesamt weicht die Steuerung geringf�gig ab.
- Im Rad gibt es einen rot markierten Bereich der unter bestimmten Bedingungen zu Fehlern f�hrt, wenn der Nutzer mit dem Finger �ber den roten Bereich kommt.
Vor dem Fehler wird �ber das Tutorial als Hinweis gewarnt.

Anpassung:
Die maximale L�nge des zu erratenden Codes ist per default auf 8 gesetzt. Im Quellcode kann dieser am Anfang des Codes unter "maxLvl" angepasst werden. Ich empfehle diesen nicht h�her als 10 zu setzen, da bereits nach zwei Level schlechtere Performance zu beobachten ist. Dieses Problem konnte ich leider noch nicht beheben. Dennoch ist es laut meinen Tests im letzten Level immernoch relativ gut spielbar.