<?php

namespace Feston\AperitifBundle\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;

/**
 * Aperitif
 *
 * @ORM\Table()
 * @ORM\Entity
 */
class Aperitif
{
    /**
     * @var integer
     *
     * @ORM\Column(name="id", type="string")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="UUID")
     */
    private $id;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="created", type="datetime")
     */
    private $created;

    /**
     * @var string
     *
     * @ORM\Column(name="location", type="string", length=255)
     */
    private $location;

    /**
     * @var string
     *
     * @ORM\Column(name="message", type="string", length=255)
     */
    private $message;

    /**
     * @ORM\OneToMany(targetEntity="Feston\AperitifBundle\Entity\User", mappedBy="aperitif")
     */
    protected $attendees;

    public function __construct($location)
    {
        $this->created = new \DateTime();
        $this->location = $location;
        $this->attendees = new ArrayCollection();
    }


    /**
     * Get id
     *
     * @return string
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set created
     *
     * @param \DateTime $created
     * @return Aperitif
     */
    public function setCreated($created)
    {
        $this->created = $created;

        return $this;
    }

    /**
     * Get created
     *
     * @return \DateTime
     */
    public function getCreated()
    {
        return $this->created;
    }

    /**
     * Set location
     *
     * @param string $location
     * @return Aperitif
     */
    public function setLocation($location)
    {
        $this->location = $location;

        return $this;
    }

    /**
     * Get location
     *
     * @return string
     */
    public function getLocation()
    {
        return $this->location;
    }

    /**
     * Set message
     *
     * @param string $message
     * @return Aperitif
     */
    public function setMessage($message)
    {
        $this->message = $message;

        return $this;
    }

    /**
     * Get message
     *
     * @return string
     */
    public function getMessage()
    {
        return $this->message;
    }

    /**
     * Add attendees
     *
     * @param \Feston\AperitifBundle\Entity\User $attendees
     * @return Aperitif
     */
    public function addAttendee(\Feston\AperitifBundle\Entity\User $attendee)
    {
        $this->attendees[] = $attendee;
        $attendee->setAperitif($this);

        return $this;
    }

    /**
     * Remove attendees
     *
     * @param \Feston\AperitifBundle\Entity\User $attendees
     */
    public function removeAttendee(\Feston\AperitifBundle\Entity\User $attendee)
    {
        $this->attendees->removeElement($attendee);
        $attendee->setAperitif(null);
    }

    /**
     * Get attendees
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getAttendees()
    {
        return $this->attendees;
    }
}
